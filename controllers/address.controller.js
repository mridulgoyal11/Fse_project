const db = require("../config/db");

// Add a new address
exports.addAddress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { full_name, street, city, state, zip_code, country, phone, address_type } = req.body;

        await db.execute(
            "INSERT INTO address (user_id, full_name, street, city, state, zip_code, country, phone, address_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [userId, full_name, street, city, state, zip_code, country, phone, address_type]
        );

        res.json({ message: "Address added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get user's addresses
exports.getAddresses = async (req, res) => {
    try {
        const userId = req.user.userId;
        const [addresses] = await db.execute("SELECT * FROM address WHERE user_id = ?", [userId]);

        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
    try {
        const { address_id } = req.params;
        await db.execute("DELETE FROM address WHERE id = ?", [address_id]);

        res.json({ message: "Address deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
