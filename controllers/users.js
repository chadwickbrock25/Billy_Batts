const express = require('express');
const userRouter = new express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/users.js')

userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'New Admin',
    });
});

userRouter.post('/', (req, res) => {
    //hash password before database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log(createdUser)
        res.redirect('/merch')
    })
});

module.exports = userRouter
