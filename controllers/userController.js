const db = require('../config/db');
const bcrypt = require('bcrypt');

// Helper function to check if a user exists
const findUserById = async (id) => {
    const [user] = await db.query(
        'SELECT id, user_name, user_email, user_age, phone, created_on FROM Users WHERE id = ? LIMIT 1',
        [id]
    );
    return user.length ? user[0] : null;
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { user_name, user_email, user_pwd, user_age, phone } = req.body;
        const userId = req.user.id;

        if (!user_name || !user_email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Check if email is already taken
        const [existingUser] = await db.query(
            'SELECT id FROM Users WHERE user_email = ? AND id != ? LIMIT 1',
            [user_email, userId]
        );
        if (existingUser.length) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Prepare update query
        let updateFields = ['user_name = ?', 'user_email = ?', 'user_age = ?', 'phone = ?'];
        let queryParams = [user_name, user_email, user_age, phone];

        if (user_pwd) {
            const hashedPassword = await bcrypt.hash(user_pwd, 10);
            updateFields.push('user_pwd = ?');
            queryParams.push(hashedPassword);
        }

        queryParams.push(userId);

        const [result] = await db.query(`UPDATE Users SET ${updateFields.join(', ')} WHERE id = ?`, queryParams);

        if (!result.affectedRows) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, user_name, user_email, user_age, phone, created_on FROM Users');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user by ID (admin only)
const getUserById = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user (admin only)
const updateUser = async (req, res) => {
    try {
        const { user_name, user_email, user_pwd, user_age, phone } = req.body;
        const userId = req.params.id;

        if (!user_name || !user_email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        let updateFields = ['user_name = ?', 'user_email = ?', 'user_age = ?', 'phone = ?'];
        let queryParams = [user_name, user_email, user_age, phone];

        if (user_pwd) {
            const hashedPassword = await bcrypt.hash(user_pwd, 10);
            updateFields.push('user_pwd = ?');
            queryParams.push(hashedPassword);
        }

        queryParams.push(userId);

        const [result] = await db.query(`UPDATE Users SET ${updateFields.join(', ')} WHERE id = ?`, queryParams);

        if (!result.affectedRows) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM Users WHERE id = ?', [req.params.id]);

        if (!result.affectedRows) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
