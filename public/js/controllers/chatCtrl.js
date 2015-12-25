app.controller('ChatController', ['$scope', 'ChatService', 'AuthenticationService', function($scope, ChatService, AuthenticationService) {
    //=======================
    // Dual Binding Variables
    //=======================
    $scope.message = '';
    $scope.history = [];
    $scope.onlineUsers = {};
    $scope.loading = false;
    //===================
    // Scope Modification
    //===================
    $scope.updateInfo = function(field, value) {
        //update entry
        var entry = $scope.onlineUsers[AuthenticationService.userInfo.username]
        entry[field] = value;
        //broadcast update
        $scope.sendInfo();
    }
    //=====================
    // Sending/Broadcasting
    //=====================
    //Send a message
    $scope.sendMessage = function() {
        if ($scope.message == '') {
            return;
        }
        $scope.loading = true;
        var data = {
            message: $scope.message,
            username: AuthenticationService.userInfo.username,
        }
        ChatService.send('message', data);
        $scope.message = '';
    }
    //Send info
    $scope.sendInfo = function() {
        var entry = $scope.onlineUsers[AuthenticationService.userInfo.username];
        var data = {
            username: AuthenticationService.userInfo.username,
            info: entry
        }
        ChatService.send('userUpdate', data);
    }
    //==========
    // Listening
    //==========
    //Listen for messages
    ChatService.receive('message', function(data) {
        if (data.username == AuthenticationService.userInfo.username) {
            $scope.loading = false;
        }
        data.type = 'message';
        $scope.history.push(data);
        $scope.$apply();
        //scroll to bottom of chat box
        $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
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
    //Listen for user data change
    ChatService.receive('userUpdate', function(data) {
        $scope.onlineUsers[data.username] = data.info;
        $scope.$apply();
    })
    //Tasks to execute upon view load
    $scope.$on('$viewContentLoaded', function() {
        //Notify server of join to chat
        ChatService.send('join', {username: AuthenticationService.userInfo.username});
    });
    //==============
    // Miscellaneous
    //==============
    $scope.getColor = function(strng) {
        return "#" + intToRGB(hashCode(strng));
    }
}]);
