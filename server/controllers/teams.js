const Teams = require('../models/teams');


const addTeam = async (req, res) => {
    try {
      const { teamname, teamlogo, hometown, teammembers } = req.body;
      const newTeam = new Teams({ teamname, teamlogo, hometown, teammembers: { ...teammembers } });
      await newTeam.save();
      res.status(201).json({ message: 'Team added successfully' });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  

const getTeams = async (req, res) => {
    try{
        const teams = await Teams.find();
        res.status(200).json(teams);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

module.exports = {addTeam, getTeams};