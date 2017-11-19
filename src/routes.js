const jwt = require('jsonwebtoken');
// Controllers
const birdController = require('./controller/bird-controller.js');
const userController = require('./controller/user-controller.js');

// array which can be then iterated over and each route can be attached.
const routes = [
    {
        path: '/createUser',
        method: 'POST',
        config: {
            auth: {
                strategy: 'token',
            },
            pre: [
                {
                    method: ( request, reply ) => {
                        const { user } = request.payload;
                        if (!user || !user.name || !user.username || !user.password || !user.email) {
                            reply({
                                error: true,
                                errMessage: `please provide an user with name, username, password and email`
                            }).takeover();
                        } else {
                            return reply.continue();
                        }
                    }
                }
            ]
        },
        handler: async( request, reply ) => {
            const { user } = request.payload;
            let createdUser = await userController.createUser(user);
            // To don't show the hashed password, instead of it show the plain password
            createdUser.password = user.password;
            reply({
                created: true,
                user: createdUser
            });
        }
    },
    {
        path: '/auth',
        method: 'POST',
        handler: async( request, reply ) => {
            if (!request.payload || !request.payload.username || !request.payload.password) {
                reply({
                    error: true,
                    errorMessage: 'Incorrect request, provide username and password in json format'
                });
            } else {
                const { username, password } = request.payload;asd
                const response = await userController.auth( { username, password } );
                reply( response );
            }
        }
    },
    {
        path: '/publicBirds',
        method: 'GET',
        handler: async( request, reply ) => {
            const birds = await birdController.getPublicBirds();
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
        handler: async( request, reply ) => {
            const owner = request.auth.credentials.scope;
            const result = await birdController.getMyBirds(owner);
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
        handler: async( request, reply ) => {
            const owner = request.auth.credentials.scope;
            const { birdGuid } = request.params;
            const result = await birdController.getMySpecificBird(owner, birdGuid);
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
        handler: async( request, reply ) => {
            const { bird } = request.payload;
            const savedBird = await birdController.createBird(bird, request.auth.credentials.scope);
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
                        method: async( request, reply ) => {
                            const { birdGuid } = request.params;
                            const { scope } = request.auth.credentials;
                            const bird = await birdController.getBirdByGuid(birdGuid);
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
        handler: async( request, reply ) => {
            const { birdGuid } = request.params;
            const { bird } = request.payload;
            if (!birdGuid || !bird) {
                reply({
                    error: true,
                    errorMessage: 'Provide the bird and bird guid'
                });
            } else {
                const result = await birdController.updateBirdByGuid(bird, birdGuid);
                reply({
                    updated: true,
                    updatedBird: result
                });
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
                        method: async( request, reply ) => {
                            const { birdGuid } = request.params;
                            const { scope } = request.auth.credentials;
                            const bird = await birdController.getBirdByGuid(birdGuid);
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
        handler: async( request, reply ) => {
            const { birdGuid } = request.params;
            if (!birdGuid) {
                reply({
                    error: true,
                    errorMessage: 'Provide the bird and bird guid'
                });
            } else {
                const operation = await birdController.deleteBirdByGuid(birdGuid);
                const deleted = operation.result.n ? true : false;
                reply({ deleted });
            }
        }
    }
]

module.exports = routes;