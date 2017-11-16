const bd = require('./../database/bd.js');

function getUsers(fields) {
    return bd.getUsers();
}

module.exports = {
    'getUsers' : getUsers
}