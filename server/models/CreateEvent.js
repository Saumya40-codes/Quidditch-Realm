const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    date: { type: Date, required: true },
    deadline: { type: Date, required: true },
    description: { type: String, required: true },
    format: { type: String, required: true },
    rules: { type: String, required: false },
    team1: { type: String, required: true },
    team1logo: { type: String, required: true },
    team2: { type: String, required: true },
    team2logo: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String, required: true },
    venue: { type: String, required: true },
    venuesize: { type: String, required: false },
});



const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

