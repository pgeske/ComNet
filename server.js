// server.js

//======
// Setup
//======
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
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
server.listen(port);

//=======
// Socket
//=======
var sockets = [];
io.on('connection', function(socket) {
    //add socket to array of sockets
    if (sockets.indexOf(socket) == -1) {
        sockets.push(socket);
    }
    //broadcast message to all sockets
    socket.on('message', function(data) {
        sockets.forEach(function(sock) {
            sock.emit('message', data);
        })
    });
})
console.log("Listening on port " + port);
