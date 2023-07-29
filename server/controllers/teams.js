const Teams = require('../models/Teams');


const addTeam = async (req, res) => {
    try {
      const {teamdescription, teamname, teamlogo, hometown, teammembers, registerDate, updatedDate} = req.body;
      const newTeam = new Teams({teamdescription, teamname, teamlogo, hometown, teammembers: { ...teammembers },registerDate, updatedDate });
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

const getTeam = async (req, res) => {
  try {
    const { name } = req.params;
    const team = await Teams.findOne({ teamname: name }).select('teammembers');
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTeamDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Teams.findById(id);
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const {teamdescription, teamname, teamlogo, hometown, teammembers, updatedDate } = req.body;
    const updatedTeam = await Teams.findByIdAndUpdate(id, {teamdescription, teamname, teamlogo, hometown, teammembers, updatedDate }, { new: true });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTeam = async(req,res) =>{
  try{
    const {id} = req.params;
    const delTeam = await Teams.findByIdAndDelete(id);
    res.status(200).json(delTeam);
  }
  catch(error){
    res.status(500).json({message:"something went wrong"})
  }
}

const getByName = async(req,res) =>{
  try{
    const {name} = req.params;
    const team = await Teams.findOne(({teamname:name}))
    res.status(200).json(team);
  }
  catch(err){
    res.status(500).json({message:"something went wrong"})
  }
}


module.exports = {addTeam, getTeams, getTeam, getTeamDetails, updateTeam, deleteTeam,getByName};