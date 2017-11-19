const mongoose = require('mongoose');
// Setting the type of promise of mongoose
mongoose.Promise = require('bluebird');

// Url of connections
const mongoDB = 'mongodb://admin:admin@ds111336.mlab.com:11336/birds';

// Connecting
mongoose.connect(mongoDB, { useMongoClient: true });

module.exports = mongoose;