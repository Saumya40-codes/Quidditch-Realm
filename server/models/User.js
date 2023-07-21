const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, min: 5, max: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    interests: { type: Object, default: {} }, 
    profilePic: { type: String },
    favouriteTeam: { type: String, default: "" }
});

const NotificationsSchema = mongoose.Schema({
    message: { type: String, required: true },
    time: { type: Date, required: true, default: Date.now() },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ['message', 'request', 'notification'], default: 'notification' }
    // Add more fields as per your requirements
});

const User = mongoose.model('User', userSchema);
const Notification = mongoose.model('Notification', NotificationsSchema);

module.exports = {
    User: User,
    Notification: Notification
};
