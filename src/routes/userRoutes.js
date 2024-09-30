// src/routes/userRoutes.js
const express = require('express');
const { registerUser, authenticateUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/', getAllUsers);

module.exports = router;