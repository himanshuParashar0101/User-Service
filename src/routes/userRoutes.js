// Importing required modules
const express = require('express'); // Import the Express library for routing
const { registerUser, authenticateUser, getAllUsers, updateUserProfile } = require('../controllers/userController'); // Import controller functions for user operations

// Create a new router instance to handle user-related routes
const router = express.Router(); // Using a router allows for modular route definitions

// Register a new user
// This route allows clients to create a new user in the system
router.post('/register', registerUser); // POST request to /register triggers the registerUser function

// Authenticate an existing user
// This route allows clients to log in and receive authentication tokens
router.post('/login', authenticateUser); // POST request to /login triggers the authenticateUser function

// Get all users
// This route retrieves and returns a list of all users in the system
router.get('/', getAllUsers); // GET request to / triggers the getAllUsers function

// Update user profile
// This route allows clients to update the profile information of a specific user
router.put('/profile/:userId', updateUserProfile); // PUT request to /profile/:userId triggers the updateUserProfile function

// Export the router to be used in the main application file
module.exports = router; // Exporting allows this router to be mounted in the main app, promoting modularity
