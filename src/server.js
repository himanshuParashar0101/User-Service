require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});