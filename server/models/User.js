const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, min: 5, max: 60 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    interests: { type: Object, default: {} }, 
    profilePic: { type: String },
    favouriteTeam: { type: String, default: "" },
    
    notifications: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    auto: true,
                },
                message: String,
                date: Date,
                receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            },
        ],
        required: false,
        default: [],
    },

    occuredNotifications: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    auto: true,
                },
                message: String,
                date: Date,
                receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            },
        ],
        required: false,
        default: [],
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;