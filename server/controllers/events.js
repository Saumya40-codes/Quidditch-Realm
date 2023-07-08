const Event  = require('../models/CreateEvent');

const addEvent = async (req, res) => {
    try {
        const {date, deadline, description, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize} = req.body;
        const newEvent = new Event({date, deadline, description, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize});
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = { addEvent };