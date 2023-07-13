const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, min: 5, max: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    interests: { type: Object, default: {} }, // Change the interests field to an object
});
  

const User = mongoose.model('User', userSchema);

module.exports = User;