require('dotenv').config(); //importing the dotenv package .env to process.env
const express = require('express');
const mongoose = require('mongoose'); //installing odm
const userRoutes = require('./routes/userRoutes');
const eventEmitter = require('./eventEmitter'); // Import the event emitter

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`User Service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Event Listeners
eventEmitter.on('User Registered', (user) => {
    console.log(`User Registered: ${user.email}`);
    // Additional logic for handling the event
});

eventEmitter.on('User Profile Updated', (user) => {
    console.log(`User Profile Updated: ${user.email}`);
    // Additional logic for handling the event
});