const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/users');
const sessionsRouter = express.Router()

sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        tabTitle: "Admin log in",
        currentUser: req.session.currentUser,
    });
});

sessionsRouter.post('/',  (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        // Database error
        if (err) {
          console.log(err)
          res.send('oops the db had a problem')
        } else if (!foundUser) {
          // if found user is undefined,null, not found
          res.send('<a  href="/sessions/new">Sorry, no user found </a>')
        } else {
          // user is found
          // check if passwords match
          if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            // add user to session
            req.session.currentUser = foundUser
            // redirect back to merch page
            res.redirect('/merch')
          } else {
            // passwords do not match
            res.send('<a href="/sessions/new"> password does not match </a>')
          }
        }
      })
    })
    
    sessionsRouter.delete('/', (req, res) => {
      req.session.destroy(() => {
        res.redirect('/')
      })
    })

module.exports = sessionsRouter;