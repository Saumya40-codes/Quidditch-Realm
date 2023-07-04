const express = require('express');
const app = express();
const cors = require('cors');

const {register} = require('./controllers/auth.js');
const User = require('./models/User.js');
app.use(cors());
app.use(express.json());  


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users.js');
app.use('/auth', authRoutes);


// ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
var nodemailer = require('nodemailer');

app.use('/users',userRoutes)

const CONNECTION_URL = process.env.CONNECTION_URI;
const PORT = process.env.PORT || 5000;


app.post("/auth/register", register);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try{
  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {expiresIn: "5m"});
  const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

var mailOptions = {
  from: 'abc@gmail.com',
  to: email,
  subject: 'Reset Your Password',
  text: `Click on the link to reset your password ${link}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
} catch(error){
  res.status(500).json({message: "Something went wrong"});
}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index",{email: verify.email, status:"nonverified"});
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const {password} = req.body;
  const {confirmPassword} = req.body;
  if(password !== confirmPassword){
    return res.status(400).json({message: "Passwords don't match"});
  }
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({_id:id},{$set:{password:encryptedPassword}});
    res.render("index",{email: verify.email, status:"verified"});
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});