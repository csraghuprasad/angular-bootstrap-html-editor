angular.module("editor", ['htmlEditor', "ui.router"])
    .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        var homeState = {
            name: 'home',
            url: '/',
            templateUrl: "templates/home.html"
        };

        var installationState = {
            name: 'installation',
            url: '/installation',
            templateUrl: "templates/installation.html"
        };
        var demoState = {
            name: 'demo',
            url: '/demo',
            templateUrl: "templates/demo.html",
            controller: 'demoCtrl'
        };

        $stateProvider.state(homeState);
        $stateProvider.state(installationState);
        $stateProvider.state(demoState);

        //$locationProvider.html5Mode(true).hashPrefix('!');

    }]).controller('mainCtrl', ['$scope', function ($scope) {

    }]).controller('demoCtrl', ['$scope', function ($scope) {
        $scope.htmlContent = '<h3>Add your content here.</h3><p>Enjoy!</p>';
    }]);