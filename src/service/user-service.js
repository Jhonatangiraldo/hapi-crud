const userRepository = require('./../repository/user-repository.js');


function auth(fields) {
    const users = userRepository.getUsers();
    return users.filter( x => x.username === fields.username );
}

module.exports = {
    'auth' : auth
}