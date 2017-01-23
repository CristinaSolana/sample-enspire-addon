childApp.factory('magentoService', componentService);

function componentService() {
    console.log('3pd magentoService');

    // Mock Data
    var app = {
        "id": '123456789',
        "title": 'Magento',
        "description": 'Magento Description here...',
        "menu": [
            {
                "icon": 'customer',
                "title": 'Customers',
                "state": 'customerList'
            }
        ],
        "bar": {
            "title": 'Jason\'s App',
            "buttons": [
                {
                    "text": "Enable",
                    "icon": "check-circle",
                    "event": "enableMagento"
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