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



const getEvents = async (req, res) => {
    try {
        const currentdate = new Date();
        const events = await Event.find({date:{$gte:currentdate}}).sort({date:1});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        res.status(200).json(deletedEvent);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {addEvent, getEvents, deleteEvent};