const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Database connection
require("dotenv").config();

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await db.execute("INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, phone]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ 
            token, 
            user: { id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role } 
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Users (Admin Only)
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute("SELECT id, name, email, phone, role FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get User Profile (Protected)
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Extracted from JWT middleware

        const [user] = await db.execute("SELECT id, name, email, phone, role FROM users WHERE id = ?", [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user[0]);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update User Profile (Protected)
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ message: "Name and phone number are required" });
        }

        await db.execute("UPDATE users SET name = ?, phone = ? WHERE id = ?", [name, phone, userId]);

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete User (Admin Only)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await db.execute("DELETE FROM users WHERE id = ?", [id]);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
