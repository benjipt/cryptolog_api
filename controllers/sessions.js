const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')


// sessions.get('/new', (req, res) => {
//     //what to do here?
//   res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
// })

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
  console.log(req.body)

  User.findOne({ userName: req.body.userName }, (err, foundUser) => {
    console.log(foundUser)
    // console.log(userName)
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
        console.log(req.body)
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.redirect('/')
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

