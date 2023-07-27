const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('./models/User.js');
require('dotenv').config();

// Increase the payload limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());


// Your other middleware and routes go here

// Connect to MongoDB
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch((error) => console.log(error.message));

// Endpoint to handle Google authentication
// Endpoint to handle Google authentication
app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Exchange the Google token for an access token
    const response = await axios.post('https://www.googleapis.com/oauth2/v4/token', {
      code: token,
      client_id: process.env.CLIENT_ID, // Use the environment variable
      client_secret: process.env.CLIENT_SECRET, // Use the environment variable
      redirect_uri: 'http://localhost:5000/auth/google/callback',
      grant_type: 'authorization_code'
    });

    // ...
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



const {register} = require('./controllers/auth.js');
const { adminRegister } = require('./controllers/auth.js');

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
app.post("/auth/admin/register", adminRegister);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    app.post("/forgot-password", async (req, res) => {
      const { email } = req.body;
    
      try {
        const oldUser = await User.findOne({ email });
        
        if (!oldUser) {
          return res.status(404).json({ message: "User doesn't exist" });
        }
        
        if (!oldUser.email) {
          return res.status(400).json({ message: "User doesn't have an email" });
        }
        
        const secret = process.env.JWT_SECRET + oldUser.password;
        let token;
        
        if (oldUser.isAdmin) {
          token = jwt.sign({ email: oldUser.email, id: oldUser._id, isAdmin: oldUser.isAdmin }, secret, { expiresIn: "5m" });
        } else {
          token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
        }
        
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
        
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
  subject: 'Reset Your Password',
  text: `Click on the link to reset your password ${link}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    res.status(200).json({message: "Email sent successfully"});
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





// events part

const eventRoutes = require('./routes/event.js');
app.use('/events',eventRoutes)


// teams part

const teamRoutes = require('./routes/team.js');
app.use('/teams',teamRoutes)