// server.js

//======
// Setup
//======
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var database = require('./config/database.js');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

//======
// Config
//======
mongoose.connect(database.url);

//==========
// Middleware
//==========
app.use(methodOverride());
app.use(bodyParser.json());
// where to serve static information from
app.use(express.static(__dirname + '/public'));

//========
// Routing
//========
require('./app/routes.js')(app);

//=======
// Server
//=======
app.listen(port);
console.log("Listening on port " + port);
