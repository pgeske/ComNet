app.controller('LoginController', ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
    // dual-binding variables
    $scope.username = '';
    $scope.password = '';
    $scope.valid = null;
    $scope.registered = null;
    // login
    $scope.login = function() {
        AuthenticationService.authenticate($scope.username, $scope.password).
            success(function(data) {
                $scope.valid = AuthenticationService.isLoggedIn;
                console.log(AuthenticationService.isLoggedIn); 
                if ($scope.valid) {
                    $location.path('/');
                }
                //$scope.valid = data.valid;
            });
    }
    //register
    $scope.register = function() {
        AuthenticationService.addAccount($scope.username, $scope.password).
            success(function(data) {
                $scope.registered = data.registered;
            })
    }

}]);
