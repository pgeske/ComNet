app.controller('ChatController', ['$scope', 'ChatService', 'AuthenticationService', function($scope, ChatService, AuthenticationService) {
    // dual binding variables
    $scope.message = '';
    $scope.history = [];
    //Send a message
    $scope.sendMessage = function() {
        var data = {
            message: $scope.message,
            username: AuthenticationService.userInfo.username
        }
        ChatService.send('message', data);
        $scope.message = '';
    }
    //Listen for messages
    ChatService.receive('message', function(data) {
        $scope.history.push(data);
        $scope.$apply();
    });
}]);
