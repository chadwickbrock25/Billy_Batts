const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config();

const PORT = 3000

// middleware to help with the form submission
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


// mongoose connection logic
mongoose.connect('mongodb://localhost:27017/merch', { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// importing the merch model
const Merch = require('./models/merch.js')

const MerchController = require('./controllers/routes.js')
app.use('/merch', MerchController)

// the app running the server
app.listen(PORT, () => {
  console.log('listening')
})