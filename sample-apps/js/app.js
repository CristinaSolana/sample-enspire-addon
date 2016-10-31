var childApp = angular.module('childApp', ['enspire.ui', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {
    console.log('Add-on app config loaded...');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('my-app', {
            url: '/my-app',
            templateUrl: './views/my-app.html',
            controller: 'childAppCtrl as ctrl'
        })
        .state('magento', {
            url: '/magento',
            templateUrl: './views/magento.html',
            controller: 'childAppCtrl as ctrl'
        })
        .state('quickbooks', {
            url: '/quickbooks',
            templateUrl: './views/quickbooks.html',
            controller: 'childAppCtrl as ctrl'
        });
}