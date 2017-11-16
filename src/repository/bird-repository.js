const bd = require('./../database/bd.js');

function getAllBirds() {
    return bd.getBirds();
}

function getPublicBirds() {
    const birds = bd.getBirds();
    return birds.filter( x => x.isPublic );
}

function createBird(bird) {
    return bd.createBird(bird);
}

function getBirdByGuid(guid) {
    const birds = bd.getBirds();
    return birds.filter( x => x.guid === guid);
}

function updateBirdByGuid(bird, guid) {
    const birds = bd.getBirds();
    const indexUpdatedBird = birds.findIndex( x => x.guid === guid);
    return bd.updateBird(indexUpdatedBird, bird);
}

function deleteBirdByGuid(guid) {
    const birds = bd.getBirds();
    const indexUpdatedBird = birds.findIndex( x => x.guid === guid);
    return bd.deleteBird(indexUpdatedBird);
}

module.exports = {
    'getPublicBirds' : getPublicBirds, 'createBird' : createBird, 'getBirdByGuid' : getBirdByGuid,
    'updateBirdByGuid' : updateBirdByGuid, 'getAllBirds' : getAllBirds, 'deleteBirdByGuid' : deleteBirdByGuid
};