app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/chat.html',
            controller: 'ChatController',
            access: {restricted: true}
        }).
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            access: {restricted: false}
        }).
        otherwise({
            redirectTo: '/'
        })
        /* when('/chat', { */
        /*     templateUrl: 'views/chat.html', */
        /*     controller: 'ChatController', */
        /*     access: {restricted: true} */
        /* }) */
}]);
