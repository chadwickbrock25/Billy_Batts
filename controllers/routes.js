const express = require('express');
const router = express.Router();

const Merch = require('../models/merch.js');

// ROUTES
// index
router.get('/',  (req, res)=>{
  Merch.find({}, (error, allMerch)=>{
    res.render('index.ejs', {
      merch: allMerch,
      tabTitle: 'Merchandise',
      currentUser: req.session.currentUser,
    })
  })
})


// new
router.get('/new', (req, res) => {
  res.render('new.ejs', {
    tabTitle: 'New Item',
    currentUser: req.session.currentUser,
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
                name:'Stickers',
                image:'images/sticker.jpg',
                price: 6,
                quanity: 6,
                inStock:true,
                description: 'Stickers, Patches, & Buttons O MY',
            },
            {
                name:'Russ CD',
                image:'images/russ_cd.jpeg',
                price: 6,
                quanity: 6,
                inStock:true,
                description: 'The full length debut CD from Billy Batts & The Made Men.',
            },
            {
                name: 'Shovel T-shirt',
                image: 'images/shirt.jpg',
                price: 6,
                quanity: 6,
                inStock:true,
                description: 'Black Classic T-shirt ',
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
        tabTitle: 'Edit Item',
        currentUser: req.session.currentUser,
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
      tabTitle: foundMerch.name,
      currentUser: req.session.currentUser,
    })
  })
})

// delete
router.delete('/:id', (req, res) => {
  Merch.findByIdAndRemove(req.params.id, { 
  useFindAndModify: false }, (err, data)=>{
    res.redirect('/merch') //redirect back to merch index
  })
})

//buy
router.put('/:id/buy', (req, res) => {
  // console.log(merch.name)
    Merch.findByIdAndUpdate(req.params.id, 
      {$inc: {quanity: -1}}, (err, oneItem) => {
          res.redirect(`/merch/${req.params.id}`)
      });
});


module.exports = router;