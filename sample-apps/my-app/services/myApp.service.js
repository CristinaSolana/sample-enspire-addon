childApp.factory('myAppService', componentService);

function componentService() {
    // Mock Data
    var app = {
        "id": '987654321',
        "title": 'My App',
        "description": 'My app description here...',
        "menu": [
            {
                "icon": 'receipt-curled',
                "title": 'Orders',
                "state": 'ordersList'
            }
        ],
        "bar": {
            "title": 'Cristina\'s App',
            "buttons": [
                {
                    "text": "New",
                    "icon": "plus-circle",
                    "event": "newApp"
                }
            ]
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