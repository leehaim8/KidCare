require('dotenv').config();
const mongoose = require('mongoose');

// Ensure `DB_HOST` is defined
const DB_HOST = process.env.DB_HOST;
if (!DB_HOST) {
    console.error("❌ ERROR: Missing DB_HOST in environment variables");
    process.exit(1); // Stop server if DB_HOST is not set
}

// Connect to MongoDB Atlas
mongoose
    .connect(DB_HOST, {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 50000, // Give MongoDB 30 seconds to connect
        socketTimeoutMS: 75000, // Prevent timeouts on queries
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Stop server if DB connection fails
    });

module.exports = mongoose;
