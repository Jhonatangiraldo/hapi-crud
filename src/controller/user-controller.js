const userService = require('./../service/user-service.js');
const jwt = require('jsonwebtoken');
const constants = require('./../constants/constants.js');

function auth(fields) {
    const users = userService.auth(fields);
    if (!users.length) {
        return {
            error: true,
            errorMessage: 'the specified user was not found'
        };
    }
    return comparePasswordUser(users, fields);
}

function comparePasswordUser([user], fields) {
    if( user.password !== fields.password ) {
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
            expiresIn: '1h',
        };
        const token = jwt.sign( payload, key, options);
        return {
            token,
            scope: user.guid,
        };
    }
}

module.exports = {
    'auth' : auth
}