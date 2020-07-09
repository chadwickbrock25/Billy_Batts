const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection;
const methodOverride = require('method-override')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// middleware to help with the form submission
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `merches`;

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
    res.render('events.ejs', {
      merch: allMerch,
      
    })
  })
})

const MerchController = require('./controllers/routes.js')
app.use('/merch', MerchController)

// the app running the server
app.listen(PORT, () => {
  console.log('listening')
})