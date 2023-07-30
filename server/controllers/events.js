const Event  = require('../models/CreateEvent');
const User = require('../models/User');

const addEvent = async (req, res) => {
    try {
        const {date, deadline, description, endtime, format, rules, team1, team1logo, team2, team2logo, ticket, title, venue, venuesize, time} = req.body;
        const newEvent = new Event({date, deadline, description, endtime, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize,ticket});
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
        const onlyDate = currentdate.toISOString().slice(0,10);

        const events = await Event.find({ date: { $gte: onlyDate } }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

const getAllEvents = async (req,res) =>{
    try{
        const all = await Event.find().sort({ date: -1});
        res.status(200).json(all);
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

const getPastEvents = async (req, res) => {
    try {
        const currentdate = new Date();
        const events = await Event.find({ date: { $lt: currentdate } }).sort({ date: -1 });
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
      const { date, deadline, description,endtime, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize,ticket } = req.body;
      const updateEvent = await Event.findByIdAndUpdate(id, { date, deadline, description,endtime, format, rules, team1, team1logo, team2, team2logo, time, title, venue, venuesize, time,ticket }, { new: true });

      res.status(200).json(updateEvent);
    } catch (error) {
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

  const updateInterested = async (req, res) => {
    try {
        const { id } = req.params;
        const { interest } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, { interest: interest }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const addComments = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, username, date, likes } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, { $push: { usercomments: { comment: comment, username: username, date: date, likes:likes } } }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const editComment = async (req, res) => {
    try {
      const { id } = req.params;
      const {usercomments} = req.body;
      const updateEvent = await Event.findByIdAndUpdate(id, {$set: {usercomments: usercomments}}, { new: true });
      res.status(200).json(updateEvent);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
  };
  


const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentId } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, { $pull: { usercomments: { _id: commentId } } }, { new: true });  
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const ticketChanges = async(req, res) =>{
    try{
        const {id} = req.params;
        const {ticket, ticketSold, totalSale} = req.body;
        const updateEvent = await Event.findByIdAndUpdate(id, {ticket:ticket, ticketSold:ticketSold, totalSale: totalSale});
        res.status(200).json(updateEvent);
    }
    catch(err){
        res.status(500).json({message: "Something went wrong"});
    }
}
  
module.exports = {addEvent, getEvents, deleteEvent, getEvent, getAllEvents, updateEvents, getPastEvents, updateScores, updateInterested, addComments, deleteComment, editComment, ticketChanges};