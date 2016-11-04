var childApp = angular.module('childApp', ['enspire.ui', 'ui.router'])
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