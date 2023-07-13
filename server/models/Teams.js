const mongoose = require('mongoose');


const teamSchema = mongoose.Schema({
    teamname: { type: String, required: true },
    teamlogo: { type: String, required: true },
    hometown: { type: String, required: false },
    teammembers: {
      seekers: { type: [String], required: false },
      keepers: { type: [String], required: false },
      beaters: { type: [String], required: false },
      chasers: { type: [String], required: false },
    },
  });
  
const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;
