// Importing required modules
const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing and comparison

// Define a schema for the user model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

// Pre-save middleware to hash the password before saving to the database
userSchema.pre('save', async function(next) {
    const user = this; // Reference to the current user document
    if (user.isModified('password')) { // Check if the password field has been modified
        console.log('Hashing password...'); // Log to indicate password hashing is happening
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(user.password, salt); // Hash the password using the salt
        user.password = hashedPassword; // Store the hashed password back in the user document
    }
    next(); // Proceed to the next middleware or save operation
});

// Method to compare a provided password with the stored hashed password
userSchema.methods.comparePassword = function(password) {
    console.log(password); // Log the password to be compared
    console.log(this.password); // Log the stored hashed password
    return bcrypt.compare(password, this.password); // Compare the two passwords and return the result
};

// Log the methods attached to the user schema for debugging purposes
console.log('userSchema.methods:', userSchema.methods);

// Create a Mongoose model for the User based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
