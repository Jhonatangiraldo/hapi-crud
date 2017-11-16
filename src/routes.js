const jwt = require('jsonwebtoken');
const GUID = require('node-uuid');
// Controllers
const birdController = require('./controller/bird-controller.js');
const userController = require('./controller/user-controller.js');

// array which can be then iterated over and each route can be attached.
const routes = [
    {
        path: '/auth',
        method: 'POST',
        handler: ( request, reply ) => {
            if (!request.payload || !request.payload.username || !request.payload.password) {
                reply({
                    error: true,
                    errorMessage: 'Incorrect request, provide username and password in json format'
                });
            } else {
                const { username, password } = request.payload;
                const response = userController.auth( { username, password } );
                reply( response );
            }
        }
    },
    {
        path: '/publicBirds',
        method: 'GET',
        handler: ( request, reply ) => {
            const birds = birdController.getPublicBirds();
            reply({
                data: birds,
                count: birds.length
            });
        }
    },
    {
        path: '/birds',
        method: 'GET',
        config: {
            auth: {
                strategy: 'token',
            }
        },
        handler: ( request, reply ) => {
            const owner = request.auth.credentials.scope;
            const result = birdController.getMyBirds(owner);
            reply( result );
        }
    },
    {
        path: '/birds/{birdGuid}',
        method: 'GET',
        config: {
            auth: {
                strategy: 'token',
            }
        },
        handler: ( request, reply ) => {
            const owner = request.auth.credentials.scope;
            const { birdGuid } = request.params;
            const result = birdController.getMySpecificBird(owner, birdGuid);
            reply( result );
        }
    },
    {
        path: '/birds',
        method: 'POST',
        config: {
            auth: {
                strategy: 'token',
            }
        },
        handler: ( request, reply ) => {
            const { bird } = request.payload;
            const guid = GUID.v4();

            const newBird = {
                    owner: request.auth.credentials.scope,
                    name: bird.name,
                    species: bird.species,
                    picture_url: bird.picture_url,
                    guid,
            };
            const savedBird = birdController.createBird(newBird);
            const result = {
                success : true,
                savedBird
            };
            reply( result );
        }
    },
    {
        path: '/birds/{birdGuid}',
        method: 'PUT',
        config: {
            auth: {
                strategy: 'token',
            },
            pre: [
                    {
                        method: ( request, reply ) => {
                            const { birdGuid } = request.params;
                            const { scope } = request.auth.credentials;
                            const bird = birdController.getBirdByGuid(birdGuid)[0];
                            if( !bird ) {
                                reply({
                                    error: true,
                                    errMessage: `the bird with id ${ birdGuid } was not found`
                                }).takeover();
                            } else if( bird && bird.owner !== scope ) {
                                reply({
                                    error: true,
                                    errMessage: `the bird with id ${ birdGuid } is not in the current scope`
                                }).takeover();
                            } else {
                                return reply.continue();
                            }
                        }
                    }
            ]
        },
        handler: ( request, reply ) => {
            const { birdGuid } = request.params;
            const { bird } = request.payload;
            if (!birdGuid || !bird) {
                reply({
                    error: true,
                    errorMessage: 'Provide the bird and bird guid'
                });
            } else {
                const result = birdController.updateBirdByGuid(bird, birdGuid);
                reply( result );
            }
        }
    },
    {
        path: '/birds/{birdGuid}',
        method: 'DELETE',
        config: {
            auth: {
                strategy: 'token',
            },
            pre: [
                    {
                        method: ( request, reply ) => {
                            const { birdGuid } = request.params;
                            const { scope } = request.auth.credentials;
                            const bird = birdController.getBirdByGuid(birdGuid)[0];
                            if( !bird ) {
                                reply({
                                    error: true,
                                    errMessage: `the bird with id ${ birdGuid } was not found`
                                }).takeover();
                            } else if( bird && bird.owner !== scope ) {
                                reply({
                                    error: true,
                                    errMessage: `the bird with id ${ birdGuid } is not in the current scope`
                                }).takeover();
                            } else {
                                return reply.continue();
                            }
                        }
                    }
            ]
        },
        handler: ( request, reply ) => {
            const { birdGuid } = request.params;
            if (!birdGuid) {
                reply({
                    error: true,
                    errorMessage: 'Provide the bird and bird guid'
                });
            } else {
                const result = birdController.deleteBirdByGuid(birdGuid);
                reply({
                    deleted: true,
                    deletedBird: result
                });
            }
        }
    }
]

module.exports = routes;