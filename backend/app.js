const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chandigarh_events', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  venue: String,
  date: Date,
  time: String,
});

const User = mongoose.model('user', userSchema);
const Event = mongoose.model('event', eventSchema);

app.use(express.json({ limit: '2450mb' }));

app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  };
 app.use(cors(corsOptions)) 
app.use(express.static('public'));

// Route for registration
app.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  let result = await newUser.save();

  if (result) {
    console.log(result)
    res.send('Login successful');
  } else {
    res.send('Invalid username or password');
  }
});

// Route for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username, password });

  if (foundUser) {
    console.log(foundUser)
    if(foundUser.password === password){
      res.send('Login successful');
    }else{
      res.send('Invalid password');
    }
    
  } else {
    res.send('Invalid username or password');
  }
});

app.post('/events', async (req, res) => {
  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    venue: req.body.venue,
    date: req.body.date,
    time: req.body.time,
  });

  let result = await newEvent.save();

  if (result) {
    console.log(result)
    res.send('Event Added successfully');
  } else {
    res.send('Event not added');
  }
});

app.get('/events', async (req, res) => {
 
  const events = await Event.find({});

  if (events) {
    console.log(events)
    res.send(events);
  } else {
    res.send('Event not added');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
