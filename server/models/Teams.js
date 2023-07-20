const mongoose = require('mongoose');


const teamSchema = mongoose.Schema({
    teamdescription: { type: String, required: false },
    teamname: { type: String, required: true },
    teamlogo: { type: String, required: true },
    hometown: { type: String, required: false },
    teammembers: {
      seekers: { type: [String], required: false },
      keepers: { type: [String], required: false },
      beaters: { type: [String], required: false },
      chasers: { type: [String], required: false },
    },
    registerDate: { type: Date, required: false},
    updatedDate: { type: Date, required: false},
  });
  
const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;