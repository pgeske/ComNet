// acounts.js

var mongoose = require('mongoose');

// create and expose accounts database
module.exports = mongoose.model('Accounts', {
    username: {type: String, unique: true},
    password: String
});
