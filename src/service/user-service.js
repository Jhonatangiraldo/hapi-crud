const userRepository = require('./../repository/user-repository.js');
const GUID = require('node-uuid');
const bcrypt = require('bcrypt');
const constants = require('./../constants/constants.js');
const jwt = require('jsonwebtoken');

async function createUser(user) {
    const newUser = await buildUser(user);
    return userRepository.createUser(newUser);
}

async function buildUser(user) {
    const salt = await bcrypt.genSalt(constants.bcryptRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const guid = GUID.v4();
    return {
        name: user.name,
        username: user.username,
        password: hashedPassword,
        email: user.email,
        guid
    };
}

function getUserByUsername(username) {
    return userRepository.getUserByUsername(username);
}

async function comparePasswordUser(user, fields) {
    const passwordComparison = await bcrypt.compare(fields.password, user.password );
    if( !passwordComparison ) {
        return {
            error: true,
            errorMessage: 'incorrect password'
        };
    } else {
        const payload = {
            'username' : user.username,
            scope: user.guid,
        };
        const key = constants.key;
        const options = {
            algorithm: constants.algorithm,
            expiresIn: '5h',
        };
        const token = jwt.sign( payload, key, options);
        return {
            token,
            scope: user.guid,
        };
    }
}

module.exports = {
    'getUserByUsername' : getUserByUsername, 'createUser' : createUser, 'comparePasswordUser' : comparePasswordUser
}