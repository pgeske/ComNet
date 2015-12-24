app.controller('ChatController', ['$scope', 'ChatService', 'AuthenticationService', function($scope, ChatService, AuthenticationService) {
    // dual binding variables
    $scope.message = '';
    $scope.history = [];
    $scope.onlineUsers = [];
    $scope.loading = false;
    //Send a message
    $scope.sendMessage = function() {
        $scope.loading = true;
        var data = {
            message: $scope.message,
            username: AuthenticationService.userInfo.username,
        }
        ChatService.send('message', data);
        $scope.message = '';
    }
    //Listen for messages
    ChatService.receive('message', function(data) {
        if (data.username == AuthenticationService.userInfo.username) {
            $scope.loading = false;
        }
        data.type = 'message';
        $scope.history.push(data);
        $scope.$apply();
    });
    //Listen for joins
    ChatService.receive('join', function(data) {
        data.type = 'join';
        $scope.history.push(data);
        $scope.onlineUsers = data.onlineUsers;
        $scope.$apply();
    })
    //Listen for leaves
    ChatService.receive('leave', function(data) {
        data.type = 'leave';
        $scope.history.push(data);
        $scope.onlineUsers = data.onlineUsers;
        $scope.$apply();
    })
    //Tasks to execute upon view load
    $scope.$on('$viewContentLoaded', function() {
        //Notify server of join to chat
        ChatService.send('join', {username: AuthenticationService.userInfo.username});
    });
}]);
