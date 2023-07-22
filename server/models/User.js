const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, min: 5, max: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    interests: { type: Object, default: {} }, 
    profilePic: { type: String },
    favouriteTeam: { type: String, default: "" },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifications' }],
});

const NotificationsSchema = mongoose.Schema({
    message: { type: String, required: true },
     time: { type: Date, required: true, default: Date.now },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Notifications = mongoose.model('Notifications', NotificationsSchema);
module.exports = User;