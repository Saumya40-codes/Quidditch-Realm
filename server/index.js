const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Increase the payload limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

const registerEventRoutes = require('./routes/registerEvents.js')
app.use('/reg',registerEventRoutes);


// teams part

const teamRoutes = require('./routes/team.js');
app.use('/teams',teamRoutes)

// calendar part

const {google} = require('googleapis');
const axios = require('axios');
const session = require('express-session');

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const calendar = google.calendar({
  version: 'v3',
  auth: process.env.API_KEY,
});

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/calendar',
];

app.get('/calendar/:id', (req, res) => {
  const {id} = req.params;
  req.session.calendarId = id;
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  res.redirect(url);
});

app.get('/redirect', async (req, res) => {
  const code = req.query.code;
  const {tokens} = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const id = req.session.calendarId;
  res.redirect(`http://localhost:3000/more-details/${id}?status=200`)
});

app.post('/create-event', async (req, res) => {
  const {summary,description,dateTime1,dateTime2} = req.body;
  console.log(req.body);
  console.log(oauth2Client)
  try{
  await calendar.events.insert({
    calendarId: 'primary',
    auth: oauth2Client,
    requestBody: {
      summary: summary,
      description: description,
      start: {
        dateTime: dateTime1,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: dateTime2,
        timeZone: 'Asia/Kolkata',
      },
    },
  })
}
catch(err){
  console.log(err)
}
  res.status(200).json({message: 'Event created successfully'});
});

// stripe payment gateway

const stripe = require('stripe')(process.env.SECRET_KEY,{
  apiVersion: "2022-08-01",
})

app.get("/config",(req,res)=>{
  res.send({
    publishableKey: process.env.PUBLISHABLE_KEY,
  })
})

app.post("/create-payment-intent", async (req,res) =>{
  const { total_price } = req.body;
  try{
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "inr",
    amount: total_price,
    automatic_payment_methods :{
      enabled: true,
    },
  });

  res.status(200).json({clientSecret:paymentIntent.client_secret});
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"error occured"})
  }
})