const express = require('express');
const router = express.Router();

const Merch = require('../models/merch.js');

// ROUTES
// index
router.get('/',  (req, res)=>{
  Merch.find({}, (error, allMerch)=>{
    res.render('index.ejs', {
      merch: allMerch,
      tabTitle: 'Merchandise'
    })
  })
})


// new
router.get('/new', (req, res) => {
  res.render('new.ejs', {
    tabTitle: 'New Item'
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

//seed
router.get('/seed', (req, res)=>{
    Merch.remove(() => {
        Merch.create([
            {
                name:'sticker',
                image:'images/sticker.jpg',
                price: 6,
                quanity: 6,
                inStock:true,
                description: 'its a sticker',
            },
            {
                name:'Russ CD',
                image:'images/russ_cd.jpeg',
                price: 6,
                quanity: 6,
                inStock:true,
                description: 'its our first album',
            },
            {
                name: 'shirt',
                image: 'images/shirt.jpg',
                price: 6,
                quanity: 6,
                inStock:true,
                description: 'its a shirt',
            }
        ], (err, data)=>{
            res.redirect('/merch');
        });
    });
});

// edit
router.get('/:id/edit', (req, res)=>{
  Merch.findById(req.params.id, (err, foundMerch)=>{ //find the merch
      res.render('edit.ejs', {
        merch: foundMerch,
        tabTitle: 'Edit Item'
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
      merch: foundMerch,
      tabTitle: foundMerch.name
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