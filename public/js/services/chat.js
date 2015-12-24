app.factory('ChatService', ['$http', function($http) {
    var ChatService = {};
    ChatService.socket = io.connect('http://ec2-52-33-47-32.us-west-2.compute.amazonaws.com:8080');
    /* ChatService.socket = io.connect('http://localhost:8080'); */
    //Listen for event
    ChatService.receive = function(event, callback) {
        return ChatService.socket.on(event, callback);
    }
    //Send data
    ChatService.send = function(event, data) {
        ChatService.socket.emit(event, data);
    }
    return ChatService;
}]);
