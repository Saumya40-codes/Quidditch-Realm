const express = require('express');
const app = express();
const cors = require('cors');

const {register} = require('./controllers/auth.js');

app.use(cors());
app.use(express.json());  


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users.js');
app.use('/auth', authRoutes);

app.use('/users',userRoutes)

const CONNECTION_URL = "mongodb+srv://divyamshah04:divyamshah@cluster0.h6fegfr.mongodb.net/"
const PORT = process.env.PORT || 5000;


app.post("/auth/register", register);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));