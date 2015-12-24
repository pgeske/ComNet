app.factory('AuthenticationService', ['$http', '$sessionStorage', function($http, $sessionStorage) {
    var AuthenticationService = {};
    AuthenticationService.isLoggedIn = $sessionStorage.isLoggedIn;
    AuthenticationService.userInfo = {
        username: $sessionStorage.username
    }
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
                    AuthenticationService.userInfo.username = username;
                    //update session storage info
                    $sessionStorage.username = username;
                    $sessionStorage.isLoggedIn = true;
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
