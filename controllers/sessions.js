const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')    //maybe needed for further development purposes
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')


sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
  // jwt.sign()       //maybe needed for further development purposes
  console.log('line 16   sessions route hit!!!')

  User.findOne({ userName: req.body.userName }, (err, foundUser) => {   // I don't know if we are actually pulling from req.body
    console.log('line 19 server side ' +req.body.userName)
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.userPassword, foundUser.userPassword)) {
        // add the user to our session
        req.session.currentUser = foundUser
        res.send(foundUser)
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions

