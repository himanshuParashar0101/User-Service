// Importing required modules and setting up environment variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventEmitter = require('./eventEmitter'); // Import the event emitter

const app = express(); // Create an instance of an Express application
const PORT = process.env.PORT || 3000; // Set the port to listen on

// Middleware to parse incoming JSON requests
app.use(express.json());

// Setting up routes for user-related API endpoints
app.use('/users', userRoutes);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB'); // Log success message on successful connection

        // Start the Express server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`User Service running on port ${PORT}`); // Log that the server is running
        });
    })
    .catch(err => {
        // Log an error message if the connection fails
        console.error('Failed to connect to MongoDB', err);
    });

// Event Listeners for handling user-related events
eventEmitter.on('User Registered', (user) => {
    console.log(`User Registered: ${user.email}`); // Log user registration event
   
});

eventEmitter.on('User Profile Updated', (user) => {
    console.log(`User Profile Updated: ${user.email}`); // Log user profile update event
   
});
