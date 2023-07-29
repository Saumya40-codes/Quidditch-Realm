const Register = require('../models/Register');

const registertoEvent = async(req,res) =>{
    try{
        const {eventID, userID, name, email, phone, ticket_type, ticket_quantity, payment, total_price} = req.body;
        console.log(req.body)
        const newEntry = new Register({eventID, userID, name, email, phone, ticket_type, ticket_quantity, payment, total_price});
        await newEntry.save();
        res.status(200).json({status:'accepted'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:'declined'})
    }
}


module.exports = {registertoEvent};