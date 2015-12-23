app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            access: {restricted: false}
        }).
        when('/chat', {
            templateUrl: 'views/chat.html',
            controller: 'ChatController',
            access: {restricted: true}
        })
}]);
