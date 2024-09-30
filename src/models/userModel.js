const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }
    next();
});

userSchema.methods.comparePassword = function(password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compare(password, this.password);
};

console.log('userSchema.methods:', userSchema.methods);

const User = mongoose.model('User', userSchema);

module.exports = User;