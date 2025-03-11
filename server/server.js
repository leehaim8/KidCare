const express = require('express');
const cors = require('cors');
const path = require("path");

require('dotenv').config(); // Load environment variables
require('./db_connection'); // Ensure MongoDB connects before starting the server

const app = express();
const PORT = process.env.PORT || 8080;

// Redirect to HTTPS in production
app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https" && process.env.NODE_ENV === "production") {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

// CORS Configuration
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "https://kidcare-a7p0.onrender.com",
            "http://localhost:3000",
            "https://mellow-parfait-cd4575.netlify.app/"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy violation"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, 'public')));

// Import Routes
const { usersRouter } = require('./routers/usersRouter');
const { childrenRouter } = require('./routers/childrenRouter');
const { weekFeedBackRouter } = require('./routers/weekFeedBackRouter');
const { periodicFeedbackRouter } = require('./routers/periodicFeedbackRouter');
const { expertRouter } = require('./routers/expertRouter');
const resourcesRouter = require('./routers/resourcesRouter');
const attendenceRouter = require('./routers/attendenceRouter');

// Define API Routes
app.use('/api/users', usersRouter);
app.use('/api/children', childrenRouter);
app.use('/api/weekFeedBack', weekFeedBackRouter);
app.use('/api/periodicFeedback', periodicFeedbackRouter);
app.use('/api/expert', expertRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/attendance', attendenceRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
