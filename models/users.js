const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true, required: true},     //BUG: seems to allow me to create multiple of the same user, maybe needs more frontend logic?
    userPassword: {type: String}
})

const User = mongoose.model('User' , userSchema);
module.exports = User;