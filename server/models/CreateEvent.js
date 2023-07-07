const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    matchformat: { type: String, required: true },
    venue: { type: String, required: true },
    venueSize: { type: String, required: false },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    team1logo: { type: String, required: true },
    team2logo: { type: String, required: true },
    venueimage: { type: String, required: true },
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

