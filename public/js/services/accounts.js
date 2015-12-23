app.factory('AuthenticationService', ['$http', function($http) {
    var AuthenticationService = {};
    AuthenticationService.isLoggedIn = false;
    // authenticate
    AuthenticationService.authenticate = function(username, password) {
        params = {
            username: username,
            password: password
        }
        return $http.post('/api/accounts/authenticate', params).
            success(function(data) {
                if (data.valid) {
                    AuthenticationService.isLoggedIn = true;
                }
            })
    }
    // add account
    AuthenticationService.addAccount = function(username, password) {
        params = {
            username: username,
            password: password
        }
        console.log(params); 
        return $http.put('/api/accounts/add', params).
            success(function(data) {
                return data;
            })
    }
    return AuthenticationService;
}]);
