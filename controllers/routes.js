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
                name:'Spirit of DIY vol. 2 2020',
                image:'images/spirit2.jpeg',
                price: 10,
                quanity: 6,
                inStock:true,
                description: 'Punk and Oi compilation from British label, Punkboot Promotions! Featuring our song, "Over Again".',
                
            },
            {
                name:'Stickers',
                image:'images/sticker.jpg',
                price: 1,
                quanity: 6,
                inStock:true,
                description: 'Stickers, Patches, & Buttons O MY',
            },
            {
                name:'Russ CD',
                image:'images/russ_cd.jpeg',
                price: 10,
                quanity: 6,
                inStock:true,
                description: 'The full length debut CD from Billy Batts & The Made Men.',
            },
            {
                name: 'Shovel T-shirt',
                image: 'images/shirt.jpg',
                price: 15,
                quanity: 6,
                inStock:true,
                description: 'Black Classic T-shirt ',
            },
            {
              name:'Spirit of DIY vol. 1 2019',
              image:'images/spirit1.jpeg',
              price: 10,
              quanity: 6,
              inStock:true,
              description: 'Punk and Oi compilation from British label, Punkboot Promotions! Featuring our song, “Going Nowhere Fast”.',
            },
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
    Merch.findByIdAndUpdate(req.params.id, 
      {$inc: {quanity: -1}}, (err, oneItem) => {
          res.redirect(`/merch/${req.params.id}`)
      });
});


module.exports = router;