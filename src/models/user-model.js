const mongoose = require('./../connection.js');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    guid: String,
})

const UserModel = mongoose.model( 'User', userSchema );

module.exports = UserModel;