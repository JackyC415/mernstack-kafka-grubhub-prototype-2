const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');
const User = require("./models/User");
const Menu = require("./models/Menu");
const PORT = process.env.PORT || 3001;

//Authentication w/ passport
app.use(passport.initialize());
require("./config/passport")(passport);

//cors for cross origin resources sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_lab2_secret',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

mongoose.connect('mongodb://localhost:27017/lab2', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("MongoDB successfully connected!"))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

const { login, register, getProfile, updateProfile, logOut } = require('./routes/user');
const { getBuyerOrders, addToCart, getBuyerCart } = require('./routes/buyer');
const { getItemToEdit, getOwnerMenu, editItem, removeItem, saveItem } = require('./routes/owner');
const { searchItemByName, filterItemByName } = require('./routes/search');

app.get('/getProfile', getProfile);
app.get('/getBuyerOrders', getBuyerOrders);
app.get('/getBuyerCart', getBuyerCart);
app.get('/getOwnerMenu', getOwnerMenu);
app.get('/getItemToEdit/:id', getItemToEdit);

app.post('/login', login);
app.post('/register', register);
app.post('/updateProfile', updateProfile);
app.post('/logOut', logOut);
app.post('/addToCart', addToCart);
app.delete('/removeItem/:id', removeItem);
app.post('/editItem', editItem);
app.post('/saveItem', saveItem);
app.post('/searchItemByName', searchItemByName);
app.post('/filterItemByName', filterItemByName);

module.exports = app;
app.listen(PORT, () => console.log('Grubhub server listening on port:', PORT));