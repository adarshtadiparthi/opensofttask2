const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: [true, "Username already exists"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email is already registered"],
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
