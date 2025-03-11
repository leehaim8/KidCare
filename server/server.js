const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const PORT = 8080;

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
