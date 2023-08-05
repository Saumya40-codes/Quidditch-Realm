const User = require('../models/User.js');
const schedule = require('node-schedule');
const nodemailer  = require('nodemailer');
const env = require('dotenv')
require('dotenv').config();

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
    try {
      const getNotif = await User.findOne({ _id: id }).select("notifications");
  
      // Check if the user was found
      if (!getNotif) {
        throw new Error("User not found");
      }

      const str_notifId = notifId.toString();

      const notif = getNotif.notifications.filter((notif) => notif._id.toString() === str_notifId);

      const { message,email, date, receiver } = notif[0];
                const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
              }
            });
    
    var mailOptions = {
      from: 'abc@gmail.com',
      to: email,
      subject: 'JOIN IN, MATCH STARTED !!!',
      text: String(message).substring(0,String(message).length-30),
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }
    });

      
  
      const addNotif = await User.findByIdAndUpdate(
        id,
        { $push: { occuredNotifications: { message: message, date: date, receiver: receiver } } },
        { new: true }
      );
      const delNotif = await User.findByIdAndUpdate(id, { $pull: { notifications: { _id: notifId } } }, { new: true });

      return { addNotif, delNotif };
    } catch (error) {
      console.log("Error in occuredNotifs:", error);
      throw new Error("Something went wrong");
    }
  };
  
  
  const sendEmailNotification = async (email, message) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });
  
    const mailOptions = {
      from: 'abc@gmail.com',
      to: email,
      subject: 'JOIN IN, MATCH STARTED !!!',
      text: String(message).substring(0, String(message).length - 30),
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', email);
    } catch (error) {
      console.log('Error sending email:', error);
    }
  };
  
  // Function to schedule the notification job
  const scheduleNotificationJob = async (scheduledDate, callback) => {
    try {
      const currentTime = new Date();
      if (scheduledDate <= currentTime) {
        console.log("Scheduled date is in the past. Job cannot be scheduled.");
        return;
      }
  
      const timeUntilScheduledDate = scheduledDate - currentTime;
  
      // Schedule the job with a timeout based on the time until the scheduled date
      setTimeout(async () => {
        try {
          await callback();
        } catch (error) {
          console.log('Error occurred during job execution:', error);
        }
      }, timeUntilScheduledDate);
    } catch (error) {
      console.log('Error scheduling notification job:', error);
    }
  };
  
  // Function to handle adding a notification and scheduling the job
  const addNotification = async (req, res) => {
    try {
      const { message, email, date, receiver } = req.body;
      const { id } = req.params;
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { notifications: { message: message, email: email, date: date, receiver: receiver } } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const notifId = updatedUser.notifications[updatedUser.notifications.length - 1]._id;
      console.log(notifId);
      const scheduledDate = new Date(date);
      console.log(scheduledDate);
  
      if (scheduledDate > new Date()) {
        scheduleNotificationJob(scheduledDate, async function () {
          try {
            console.log("Notification job reached");
            await occuredNotifs(req, id, notifId);
            // Send email notification here, assuming 'email' is the recipient email address
            await sendEmailNotification(email, message);
          } catch (error) {
            console.log("Error occurred during job execution:", error);
          }
        });
      }
      res.status(200).json({ message: "Notification added successfully" });
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteNotif = async(req,res) =>{
  try{
    const {id} = req.params;
    const {formId} = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { $pull: { occuredNotifications: { _id: formId } } }, { new: true });
    res.status(200).json(updatedUser);
  }
  catch(err){
    res.status(500).json({message:'Something went wrong'})
  }
}

module.exports = { getUsers, updateUser, updateProfile, addNotification, deleteNotification, occuredNotifs, deleteNotif };