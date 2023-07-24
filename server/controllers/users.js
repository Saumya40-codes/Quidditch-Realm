const User = require('../models/User.js');
const schedule = require('node-schedule');
const moment = require('moment-timezone');

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

  const occuredNotifs = async (req, id, notifId) => {
    console.log(notifId, id);
    try {
      const getNotif = await User.findOne({ _id: id }).select("notifications");
  
      // Check if the user was found
      if (!getNotif) {
        throw new Error("User not found");
      }

      const str_notifId = notifId.toString();
      console.log(str_notifId);
      console.log(getNotif);

      const notif = getNotif.notifications.filter((notif) => notif._id.toString() === str_notifId);

      const { message, date, receiver } = notif[0];
  
      const addNotif = await User.findByIdAndUpdate(
        id,
        { $push: { occuredNotifications: { message: message, date: date, receiver: receiver } } },
        { new: true }
      );
      const delNotif = await User.findByIdAndUpdate(id, { $pull: { notifications: { _id: notifId } } }, { new: true });
  
      console.log("addNotif:", addNotif);
      console.log("delNotif:", delNotif);
  
      return { addNotif, delNotif };
    } catch (error) {
      console.log("Error in occuredNotifs:", error);
      throw new Error("Something went wrong");
    }
  };
  
  
  const addNotification = async (req, res) => {
    try {
      const { message, date, receiver } = req.body;
      const { id } = req.params;
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { notifications: { message: message, date: date, receiver: receiver } } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const notifId = updatedUser.notifications[updatedUser.notifications.length - 1]._id;
      const scheduledDate = new Date(date);
  
      if (scheduledDate > new Date()) {
        const job = schedule.scheduleJob(scheduledDate, async function () {
          try {
            const { addNotif } = await occuredNotifs(req, id, notifId);
            res.status(200).json(addNotif);
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
          }
        });
        console.log(job);
      } else {
        console.log("Scheduled date is in the past. Job cannot be scheduled.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, date, receiver } = req.body;

    const filter = { _id: id };
    const update = { $pull: { notifications: { message: message, date: date, receiver: receiver } } };

    const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getUsers, updateUser, updateProfile, addNotification, deleteNotification, occuredNotifs };
