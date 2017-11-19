const UserModel = require('./../models/user-model.js');

function createUser(user) {
    const userModel = convertUserToModel(user);
    return userModel.save();
}

function convertUserToModel(user) {
    return new UserModel({
        name: user.name,
        username: user.username,
        password: user.password,
        email: user.email,
        guid: user.guid,
    });
}

function getUserByUsername(username) {
    return UserModel.findOne({ 'username' : username });
}

module.exports = {
    'getUserByUsername' : getUserByUsername, 'createUser' : createUser
}