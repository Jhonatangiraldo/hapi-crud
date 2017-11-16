const birdRepository = require('./../repository/bird-repository.js');

function getPublicFieldsBirds(...fields) {
    const birds = birdRepository.getPublicBirds();
    const fieldsBirds = birds.map( bird => {
        let newBird = {};
        fields.forEach( field => {
            newBird[field] = bird[field];
        });
        return newBird;
    });
    return fieldsBirds;
}

function getMyBirds(owner) {
    const allBirds = birdRepository.getAllBirds();
    return allBirds.filter( x => x.owner === owner );
}

function getMySpecificBird(owner, guid) {
    const allBirds = birdRepository.getAllBirds();
    return allBirds.filter( x => x.owner === owner && x.guid === guid );
}

function createBird(bird) {
    return birdRepository.createBird(bird);
}

function getBirdByGuid(guid) {
    return birdRepository.getBirdByGuid(guid);
}

function updateBirdByGuid(bird, guid) {
    return birdRepository.updateBirdByGuid(bird, guid);
}

function deleteBirdByGuid(guid) {
    return birdRepository.deleteBirdByGuid(guid);
}

module.exports = {
    'getPublicFieldsBirds' : getPublicFieldsBirds, 'createBird' : createBird, 'getBirdByGuid' : getBirdByGuid,
    'updateBirdByGuid' : updateBirdByGuid, 'getMyBirds' : getMyBirds, 'getMySpecificBird' : getMySpecificBird,
    'deleteBirdByGuid' : deleteBirdByGuid
};