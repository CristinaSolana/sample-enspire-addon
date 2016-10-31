var childApp = angular.module('childApp', ['enspire.ui', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', config]);

function config($stateProvider, $urlRouterProvider) {
    console.info('Add-on App loaded...');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('magento', {
            url: '/magento',
            templateUrl: 'views/magento.html',
            controller: 'magentoCtrl as ctrl'
        });
}