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
var socketMap = {};
var chatUsers = {};
io.on('connection', function(socket) {
    //add entry to socketMap
    socketMap[socket.id] = {username: null};
    //add socket to array of sockets
    if (sockets.indexOf(socket) == -1) {
        sockets.push(socket);
    }
    //broadcast user update
    socket.on('userUpdate', function(data) {
        //Update chatUsers entry for username
        chatUsers[data.username] = data.info;
        //Broadcast chatUsers
        sockets.forEach(function(sock) {
            sock.emit('userUpdate', data);
        });

    });
    //broadcast join to all sockets
    socket.on('join', function(data) {
        socketMap[socket.id].username = data.username;
        //Add an entry for the user in the server's storage
        chatUsers[data.username] = {
            typing: false
        }
        //Add chatUsers field to data
        data.onlineUsers = chatUsers;
        //Broadcast to all sockets
        sockets.forEach(function(sock) {
            sock.emit('join', data);
        })
    });
    //broadcast leave to all sockets
    socket.on('disconnect', function() {
        //Remove username from chatUsers
        delete chatUsers[socketMap[socket.id].username];
        //Create data field
        data = {
            username: socketMap[socket.id].username,
            onlineUsers: chatUsers
        }
        sockets.forEach(function(sock) {
            sock.emit('leave', data);
        });
    });
    //broadcast message to all sockets
    socket.on('message', function(data) {
        //Add timestamp to data packet
        var date = new Date();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        data.timestamp = hour + ":" + minute;
        sockets.forEach(function(sock) {
            sock.emit('message', data);
        });
    });
});
console.log("Listening on port " + port);
