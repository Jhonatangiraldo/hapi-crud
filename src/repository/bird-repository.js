const BirdModel = require('./../models/bird-model.js');

function getMyBirds(owner) {
    return BirdModel.find({ 'owner': owner});
}

function getPublicBirds() {
    const query = BirdModel
                    .find({ 'isPublic' : true })
                    .select('name species picture_url');
    return query;
}

function getMySpecificBird(owner, guid) {
    return BirdModel.find({ 'owner': owner, 'guid' : guid});
}

function createBird(bird) {
    const newBird = convertBirdToModel(bird);
    return newBird.save();
}

function convertBirdToModel(bird) {
    return new BirdModel({
        owner: bird.owner,
        name: bird.name,
        species: bird.species,
        picture_url: bird.picture_url,
        guid: bird.guid,
        isPublic: bird.isPublic
    });
}

function getBirdByGuid(guid) {
    return BirdModel.findOne({'guid' : guid});
}

function updateBirdByGuid(bird, newBird) {
    updateBirdModel(bird, newBird);
    return bird.save();
}

function updateBirdModel(bird, newBird) {
    bird.owner = newBird.owner;
    bird.name = newBird.name;
    bird.species = newBird.species;
    bird.picture_url = newBird.picture_url;
    bird.isPublic = newBird.isPublic;
}

function deleteBirdByGuid(guid) {
    return BirdModel.remove({ 'guid' : guid });
}

module.exports = {
    'getPublicBirds' : getPublicBirds, 'createBird' : createBird, 'getBirdByGuid' : getBirdByGuid,
    'updateBirdByGuid' : updateBirdByGuid, 'getMySpecificBird' : getMySpecificBird, 'deleteBirdByGuid' : deleteBirdByGuid,
    'getMyBirds' : getMyBirds
};