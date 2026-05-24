const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: "" }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);