const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

const { usersRouter } = require('./routers/usersRouter');

app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow cookies if you're using them
}));
app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
