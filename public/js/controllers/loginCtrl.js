app.controller('LoginController', ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
    // dual-binding variables
    $scope.username = '';
    $scope.password = '';
    $scope.valid = null;
    $scope.registered = null;
    $scope.loading = false;
    // login
    $scope.login = function() {
        $scope.loading = true;
        AuthenticationService.authenticate($scope.username, $scope.password).
            success(function(data) {
                $scope.valid = AuthenticationService.isLoggedIn;
                if ($scope.valid) {
                    $location.path('/');
                }
                $scope.loading = false;
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
