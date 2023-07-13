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

const getPastEvents = async (req, res) => {
    try {
        const currentdate = new Date();
        const events = await Event.find({ date: { $lt: currentdate } }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        const updatedEvents = await Event.find();

        res.status(200).json(updatedEvents);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

const getEvent= async(req,res) =>{
    try{
        const {id} = req.params;
        const event = await Event.findById(id);
        res.status(200).json(event);
    }catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateEvents = async (req, res) => {
    try {
      const { id } = req.params;
      const { date, deadline, description, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize } = req.body;
      const updateEvent = await Event.findByIdAndUpdate(id, { date, deadline, description, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize }, { new: true });
      res.status(200).json(updateEvent);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
};  

module.exports = {addEvent, getEvents, deleteEvent, getEvent, updateEvents};