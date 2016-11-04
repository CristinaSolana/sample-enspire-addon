childApp.controller('myAppCtrl', componentController);

function componentController($scope, $rootScope, $window, $state, postMessageService, mockDataService, myAppService) {
    $scope.$on('$viewContentLoaded', function() {
        $window.addEventListener('message', postMessageService.receiveMessage, false);
    });

    var self = this;

    // Listens for when Platform Data Received
    // @params {object} data returns client and user platform data
    // You must retrieve and send your apps data
    var platformDataListener = $rootScope.$on('pm:platformDataReceived', function (event, data) {
        // Why am I putting this on $rootScope, you might ask: because I am a bad person. And a lazy person.
        // And I want the data to persist while I press back button in parent app. Be better than me. Use a service or post to an API.
        $rootScope.platformData = data;

        var app = myAppService.getApp();
        postMessageService.sendData(app);
    });

    // Listens for state changes
    // @params {object} data returns state name
    var stateListener = $rootScope.$on('pm:appStateChanged', function (event, data) {
        switch(data.state) {
            case 'ordersList':
                $state.go('orderList');
                break;
            case 'myapp':
                $state.go('myapp');
                break;
            default:
                break;
        }
    });

    // Listens for state changes
    // @params {object} data returns button event name.
    var btnEventListener = $rootScope.$on('pm:btnEvent', function (event, data) {
        switch (data.event) {
            case 'new':
                // do something
                break;
            default:
                break;
        }
    });

    // Get mock data...
    self.salesMockData = mockDataService.getSalesMockData();

    // Clean up...
    $scope.$on('$destroy', platformDataListener);
    $scope.$on('$destroy', stateListener);
    $scope.$on('$destroy', btnEventListener);
}