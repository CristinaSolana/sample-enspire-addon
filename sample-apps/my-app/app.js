var childApp = angular.module('childApp', ['enspire.ui', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {
    console.info('Add-on App loaded...');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('myapp', {
            url: '/my-app',
            templateUrl: 'views/my-app.html',
            controller: 'myAppCtrl as ctrl'
        })
        .state('orderList', {
            url: '/order-list',
            templateUrl: 'views/order-list.html',
            controller: 'myAppCtrl as ctrl'
        });
}