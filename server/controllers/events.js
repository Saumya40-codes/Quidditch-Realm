const Event  = require('../models/CreateEvent');

const addEvent = async (req, res) => {
    try {
        const {date, deadline, description, format, rules, team1, team1logo, team2, team2logo, ticket, title, venue, venuesize, time} = req.body;
        console.log(req.body);
        const newEvent = new Event({date, deadline, description, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize,ticket});
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.log(error);
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
      const { date, deadline, description, format, interested,totalInterested, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize,ticket } = req.body;
      const updateEvent = await Event.findByIdAndUpdate(id, { date, deadline, description, format, interested,totalInterested, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize, time,ticket }, { new: true });

      res.status(200).json(updateEvent);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
};  

const updateScores = async (req, res) => {
    try {
      const { id } = req.params;
      const { comment, team1score, team1scorer, team2score, team2scorer } = req.body;
  
      const event = await Event.findById(id);
  
      event.comment = comment;
      event.team1score = team1score;
      event.team1scorer = team1scorer;
      event.team2score = team2score;
      event.team2scorer = team2scorer;
  
      const updatedEvent = await event.save();
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  


module.exports = {addEvent, getEvents, deleteEvent, getEvent, updateEvents, getPastEvents, updateScores};