const User = require('../models/User.js');

const getUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { interests } = req.body;
      const updateDetails = await User.findByIdAndUpdate(id, {
        interests: interests,
      });
      res.status(200).json(updateDetails);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
};

const updateProfile = async (req, res) => { 
    try {
      const { id } = req.params;
      const { username, email, profilePic, favouriteTeam } = req.body;
      const updatedProfile = await User.findByIdAndUpdate(id, {
        username: username,
        email: email,
        profilePic: profilePic,
        favouriteTeam: favouriteTeam,
      });
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
module.exports = { getUsers, updateUser, updateProfile };
