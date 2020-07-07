const express = require('express');
const router = express.Router();

const Merch = require('../models/merch.js');

// ROUTES
// index
router.get('/',  (req, res)=>{
  Merch.find({}, (error, allMerch)=>{
    res.render('index.ejs', {
      merch: allMerch,
      
    })
  })
})

// new
router.get('/new', (req, res) => {
  res.render('new.ejs', {
    
  });
})

// post
router.post('/', (req, res)=>{
  if(req.body.inStock === 'on'){ 
    req.body.inStock = true;
  } else { 
    req.body.inStock = false;
  }
  Merch.create(req.body, (error, createdMerch)=>{
    res.redirect('/merch');
  })
})

// edit
router.get('/:id/edit', (req, res)=>{
  Merch.findById(req.params.id, (err, foundMerch)=>{ //find the merch
      res.render('edit.ejs', {
        merch: foundMerch, //pass in found merch details
      })
  })
})

// update
router.put('/:id', (req, res)=>{
  if(req.body.inStock === 'on'){
      req.body.inStock = true;
  } else {
      req.body.inStock = false;
  }
  Merch.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
    res.redirect('/merch');
  })
})

// show
router.get('/:id', (req, res) =>{
  Merch.findById(req.params.id, (err, foundMerch)=>{
    res.render('show.ejs', {
      merch: foundMerch
    })
  })
})

// delete
router.delete('/:id', (req, res) => {
  Merch.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data)=>{
    res.redirect('/merch') //redirect back to merch index
  })
})

module.exports = router;