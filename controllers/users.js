const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
    //how to render?
//   res.render('users/new.ejs')
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.userPassword = bcrypt.hashSync(req.body.userPassword, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

module.exports = users