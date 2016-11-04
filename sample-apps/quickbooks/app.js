var childApp = angular.module('childApp', ['enspire.ui', 'ui.router', 'enspire.postmessage'])
    .config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {
    console.info('Add-on App loaded...');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('quickbooks', {
            url: '/quickbooks',
            templateUrl: 'views/quickbooks.html',
            controller: 'quickbooksCtrl as ctrl'
        });
}