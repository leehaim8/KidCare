const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const PORT = 8080;

const { usersRouter } = require('./routers/usersRouter');
const { childrenRouter } = require('./routers/childrenRouter');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/children', childrenRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
