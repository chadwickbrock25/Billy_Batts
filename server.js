const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection;
const methodOverride = require('method-override')
require('dotenv').config();
const session = require('express-session')
const PORT = process.env.PORT || 3000;
const dbName = process.env.dbName

// middleware to help with the form submission
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.json());
app.use(session
  ({
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false 
  })
)


const MONGODB_URI = process.env.MONGODB_URI 

// mongoose connection logic
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } );

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

// importing the merch model
const Merch = require('./models/merch.js')

app.get('/',  (req, res)=>{
  Merch.find({}, (error, allMerch)=>{
    req.session.admin = 'admin'
    console.log(req.session)
    res.render('events.ejs', {
      merch: allMerch,
      tabTitle: 'Events',
      currentUser: req.session.currentUser,
    })
  })
})

app.get('/contact',  (req, res)=>{
  console.log(req.session)
  Merch.find({}, (error, allMerch)=>{
    res.render('contact.ejs', {
      merch: allMerch,
      tabTitle: 'Contact',
      currentUser: req.session.currentUser,
      
    })
  })
})

//CONTROLLERS
const MerchController = require('./controllers/routes.js')
app.use('/merch', MerchController)

const userController = require('./controllers/users.js');
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

// the app running the server
app.listen(PORT, () => {
  console.log('listening')
})