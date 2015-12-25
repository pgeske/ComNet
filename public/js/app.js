var app = angular.module('ComNet', ['ngRoute', 'ngStorage']);

app.run(function ($rootScope, $location, $route, AuthenticationService) {
    //========================
    // Root Scope Dual Binding
    //========================
    $rootScope.pageStatus = {
        'views/chat.html': {class: ''}
    };
    //==========================
    // Root Scope Event Handling
    //==========================
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        //Reroute if restricted and not logged in
        if (next.access.restricted && !AuthenticationService.isLoggedIn) {
            $location.path('/login');
        } else {
            //Update active for navbar
            /* $rootScope.pageStatus[current.templateUrl].active = false; */
            $rootScope.pageStatus[next.templateUrl].class = 'active';
        }
        
    })
})
