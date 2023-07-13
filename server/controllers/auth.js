const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const env = require('dotenv').config();

const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, email , password: hashedPassword});

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user, userId: user._id  });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const adminRegister = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    console.log(req.body);
    const isUser = await User.findOne({email});
    if(isUser != null){
      console.log("User already exists")
      return res.status(400).json({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email , password: hashedPassword, isAdmin: true});
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({email});
    if (!isUser || !isUser.isAdmin) { 
      return res.status(400).json({ message: "User doesn't exist or is not an admin" });
    }
    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign(
      { email: isUser.email, id: isUser._id, isAdmin: isUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, isUser, isAdmin: isUser.isAdmin, userId: isUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {register, login, adminRegister, adminLogin};
