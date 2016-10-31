childApp.factory('quickbooksService', componentService);

function componentService() {
    // Mock Data
    var app = {
        "id": '012345678',
        "title": 'Quickbooks',
        "description": 'Quickbooks Description here...',
        "menu": [],
        "bar": {
            "title": '',
            "buttons": []
        },
        "imports": []
    };

    var self = {
        getApp: getApp
    };

    return self;

    function getApp() {
        return app;
    }
}