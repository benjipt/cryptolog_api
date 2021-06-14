const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true, require: true},
    userPassword: {type: String}
})

const User = mongoose.model('User' , userSchema);
module.exports = User;