const express = require('express');
const { registerUser, authenticateUser, getAllUsers, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Authenticate an existing user
router.post('/login', authenticateUser);

// Get all users
router.get('/', getAllUsers);

// Update user profile
router.put('/profile/:userId', updateUserProfile);

module.exports = router;