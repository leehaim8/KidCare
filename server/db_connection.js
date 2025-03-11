require('dotenv').config();
const mongoose = require('mongoose');

// Get MongoDB URL from environment variables
const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017/kidcare";

mongoose
    .connect(DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Prevent connection timeout
        socketTimeoutMS: 45000, // Prevent long query timeout issues
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error(`❌ MongoDB Connection error: ${err.message}`);
        process.exit(1); // Exit if database connection fails
    });

module.exports = mongoose;
