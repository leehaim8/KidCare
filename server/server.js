const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const PORT = 8080;


const mongoose = require("mongoose");

const DBHOST = process.env.DBHOST || "mongodb://localhost:27017/kidcare"; // Use DBHOST

mongoose.connect(DBHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // Exit process if connection fails
    });


const { usersRouter } = require('./routers/usersRouter');
const { childrenRouter } = require('./routers/childrenRouter');
const { weekFeedBackRouter } = require('./routers/weekFeedBackRouter');
const{ periodicFeedbackRouter } = require('./routers/periodicFeedbackRouter');
const { expertRouter } = require('./routers/expertRouter');
const resourcesRouter = require('./routers/resourcesRouter');
const attendenceRouter = require('./routers/attendenceRouter');


app.use(cors({
    origin: ["https://kidcare-a7p0.onrender.com", "http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/children', childrenRouter);
app.use('/api/weekFeedBack', weekFeedBackRouter);
app.use('/api/periodicFeedback', periodicFeedbackRouter);
app.use('/api/expert', expertRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/attendance', attendenceRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
