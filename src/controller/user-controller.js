const userService = require('./../service/user-service.js');
const constants = require('./../constants/constants.js');

function createUser(user) {
    return userService.createUser(user);
}

async function auth(fields) {
    const user = await userService.getUserByUsername(fields.username);
    if (!user) {
        return {
            error: true,
            errorMessage: 'the specified user was not found'
        };
    }
    return await userService.comparePasswordUser(user, fields);
}

module.exports = {
    'auth' : auth, 'createUser' : createUser
}