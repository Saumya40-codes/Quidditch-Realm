const mongoose  = require('mongoose')


const RegisterSchema = mongoose.Schema({
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    ticket_type: { type: String, required: true },
    ticket_quantity: { type: Number, required: true },
    payment: {type:Boolean, required:true},
    total_price: {type:Number, required:true},
  });

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;
  