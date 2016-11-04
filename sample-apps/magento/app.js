var childApp = angular.module('childApp', ['enspire.ui', 'ui.router', 'enspire.postmessage'])
    .config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('magento', {
            url: '/magento',
            templateUrl: 'views/magento.html',
            controller: 'magentoCtrl as ctrl'
        });
}