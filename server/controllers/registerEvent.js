const Register = require('../models/Register');

const registertoEvent = async(req,res) =>{
    try{
        const {eventID, userID, name, email, phone, ticket_type, ticket_quantity, payment, total_price} = req.body;
        const newEntry = new Register({eventID, userID, name, email, phone, ticket_type, ticket_quantity, payment, total_price});
        await newEntry.save();
        res.status(200).json({status:'accepted'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:'declined'})
    }
}

const getRegisteredIds = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await Register.find({eventID: id});
        res.status(200).json(user);
    }
    catch(err){
        res.send(500).json({message:"Some error occured"});
    }
}

const getRegisteredEvents = async(req,res)=>{
    try{
        const {id} = req.params;
        const events = await Register.find({ userID: id});
        res.status(200).json(events)
    }
    catch(err){
        res.send(500).json({message:"Some error occured"});
    }
}


module.exports = {registertoEvent, getRegisteredIds, getRegisteredEvents};