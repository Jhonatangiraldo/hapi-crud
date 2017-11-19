const mongoose = require('./../connection.js');

const birdSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.String, ref: 'User' },
    name: String,
    specie: String,
    picture_url: String,
    guid: String,
    isPublic: Boolean
})

const BirdModel = mongoose.model( 'Bird', birdSchema );

module.exports = BirdModel;