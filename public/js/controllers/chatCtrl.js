app.controller('ChatController', ['$scope', '$rootScope','$timeout', '$window','ChatService', 'AuthenticationService', function($scope, $rootScope, $timeout, $window, ChatService, AuthenticationService) {
    //=======================
    // Dual Binding Variables
    //=======================
    $scope.message = '';
    $scope.history = [];
    $scope.onlineUsers = {};
    $scope.loading = false;
    $scope.windowActive = true;
    $scope.username = AuthenticationService.userInfo.username;
    //===================
    // Scope Modification
    //===================
    //Locally flush user info. Useful for when user joins chat
    $scope.flushInfo = function() {
        $.each($scope.onlineUsers, function(usr, info) {
            info.typing = false;
            info.seen = false;
        })
    }
    $scope.updateInfo = function(field, value) {
        //update entry
        var entry = $scope.onlineUsers[AuthenticationService.userInfo.username]
        var oldValue = entry[field];
        entry[field] = value;
        //broadcast update if there was actually a change
        if (oldValue != value) {
            $scope.sendInfo();
        }
    }
    $scope.typingTimer = {
        timer: null,
        start: function() {
            console.log("Here"); 
            if (this.timer) $timeout.cancel(this.timer);
            $scope.updateInfo('typing', true);
            this.timer = $timeout(function(){
                $scope.updateInfo('typing', false);
            }, 1000);
        }
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
        //Reset seen upon new message
        $scope.updateInfo('seen', false);
        if (data.username == AuthenticationService.userInfo.username) {
            $scope.loading = false;
        }
        if (!$scope.windowActive) {
            $rootScope.notification = "(1)";
        } else {
            //Update seen status
            if (data.username != AuthenticationService.userInfo.username) {
                $scope.updateInfo('seen', true);
            }
        }
        data.type = 'message';
        $scope.history.push(data);
        $scope.$apply();
        //scroll to bottom of chat box
        $('.receive-row').scrollTop($('.receive-row')[0].scrollHeight);
    });
    //Listen for joins
    ChatService.receive('join', function(data) {
        data.type = 'join';
        $scope.history.push(data);
        $scope.onlineUsers = data.onlineUsers;
        //Flush if it was you who joined
        if (data.username == AuthenticationService.userInfo.username) {
            $scope.flushInfo();
        }
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
    //Map username to a color
    $scope.getColor = function(strng) {
        return "#" + intToRGB(hashCode(strng));
    }
    $window.onfocus = function() {
        //Update seen, if pending notification
        if ($rootScope.notification == '(1)') {
            $scope.updateInfo('seen', true);
        }
        $rootScope.notification = "";
        $rootScope.$apply();
        $scope.windowActive = true;
    }
    $window.onblur = function() {
        $scope.windowActive = false;
    }
}]);
