const birdRepository = require('./../repository/bird-repository.js');
const GUID = require('node-uuid');

function getPublicFieldsBirds(...fields) {
    return birdRepository.getPublicBirds();
}

function getMyBirds(owner) {
    return birdRepository.getMyBirds(owner);
}

function getMySpecificBird(owner, guid) {
    return birdRepository.getMySpecificBird(owner, guid);
}

function createBird(bird, owner) {
    const guid = GUID.v4();
    const newBird = {
        owner: owner,
        name: bird.name,
        species: bird.species,
        picture_url: bird.picture_url,
        guid,
        isPublic: bird.isPublic
    };
    return birdRepository.createBird(newBird);
}

function getBirdByGuid(guid) {
    return birdRepository.getBirdByGuid(guid);
}

async function updateBirdByGuid(newBird, guid) {
    const bird = await birdRepository.getBirdByGuid(guid);
    return birdRepository.updateBirdByGuid(bird, newBird);
}

function deleteBirdByGuid(guid) {
    return birdRepository.deleteBirdByGuid(guid);
}

module.exports = {
    'getPublicFieldsBirds' : getPublicFieldsBirds, 'createBird' : createBird, 'getBirdByGuid' : getBirdByGuid,
    'updateBirdByGuid' : updateBirdByGuid, 'getMyBirds' : getMyBirds, 'getMySpecificBird' : getMySpecificBird,
    'deleteBirdByGuid' : deleteBirdByGuid
};