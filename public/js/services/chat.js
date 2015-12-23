app.factory('ChatService', ['$http', function($http) {
    var ChatService = {};
    ChatService.socket = io.connect('http://localhost:8080');
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
