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
    time: { type: Date, required: true, default: Date.now() },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ['message', 'request', 'notification'], default: 'notification' }
});

const User = mongoose.model('User', userSchema);
const Notifications = mongoose.model('Notifications', NotificationsSchema);
module.exports = User;