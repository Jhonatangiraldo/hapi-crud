const hapiAuthJwt = require('hapi-auth-jwt');
const Hapi = require('hapi');
const routes = require('./routes.js');
const constants = require('./constants/constants.js');

const server = new Hapi.Server();

server.connection({
    port: 8080
});

/*
     .register(...) registers a module within the instance of the API.
     The callback is then used to tell that the loaded module will be used
     as an authentication strategy
*/
server.register( hapiAuthJwt, ( err ) => {
    server.auth.strategy( 'token', 'jwt', {
        key: constants.key,
        verifyOptions: {
            algorithms: [ constants.algorithm ]
        }
    });

    routes.forEach( ( route ) => {
        //console.log( `attaching ${ route.path }` );
        server.route( route );
    } );
});

server.start( err => {
    if( err ) {
        console.error( 'Error was handled!' );
        console.error( err );
    }
    console.log( `Server started at ${ server.info.uri }` );
});