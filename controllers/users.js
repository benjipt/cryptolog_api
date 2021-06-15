const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
    //how to render?
//   res.render('users/new.ejs')
})


// === CREATE ROUTE ===
/*
curl -X POST -H "Content-Type: application/json" -d '{"userName" : "fake name 2" , "userPassword" : "password" }' 'http://localhost:3003/users'
*/
users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  console.log(req.body)
  req.body.userPassword = bcrypt.hashSync(req.body.userPassword, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    if (err) {
      // Tell the user something went wrong
      // status code 400 === something broke
      // json === include a body with the message from the db
      res.status(400).json({ error: err.message });
  }
  res.status(200).json({ message : 'user created!'});
  })
})

module.exports = users