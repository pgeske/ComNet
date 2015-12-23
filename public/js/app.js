var app = angular.module('ComNet', ['ngRoute']);

app.run(function ($rootScope, $location, $route, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.access.restricted && !AuthenticationService.isLoggedIn) {
            $location.path('/login');
        }
    })
})
