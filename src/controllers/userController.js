const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const eventEmitter = require('../eventEmitter'); // Import the event emitter

// Register a new user
const registerUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        eventEmitter.emit('User Registered', user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Authenticate an existing user
const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Email is: ${email}, Password: ${password}`);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('user:', user);
        console.log('user.comparePassword:', user.comparePassword);
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });//catch
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        eventEmitter.emit('User Profile Updated', user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, authenticateUser, getAllUsers, updateUserProfile };