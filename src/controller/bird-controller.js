const birdService = require('./../service/bird-service.js');

function getPublicBirds() {
    return birdService.getPublicFieldsBirds();
}

function getMyBirds(owner) {
    return birdService.getMyBirds(owner);
}

function getMySpecificBird(owner, guid) {
    return birdService.getMySpecificBird(owner, guid);
}

function createBird(bird, owner) {
    return birdService.createBird(bird, owner);
}

function getBirdByGuid(guid) {
    return birdService.getBirdByGuid(guid);
}

function updateBirdByGuid(bird, guid) {
    return birdService.updateBirdByGuid(bird, guid);
}

function deleteBirdByGuid(guid) {
    return birdService.deleteBirdByGuid(guid);
}

module.exports = {
    'getPublicBirds' : getPublicBirds, 'createBird' : createBird, 'getBirdByGuid' : getBirdByGuid, 'updateBirdByGuid' : updateBirdByGuid,
    'getMyBirds' : getMyBirds, 'getMySpecificBird' : getMySpecificBird, 'deleteBirdByGuid' : deleteBirdByGuid
};