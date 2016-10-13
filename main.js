// some data return from http requests
// may not be necessary as apps should be isolated
var apps = {
    "987654321": {
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
    },
    "123456789": {
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
    },
    "012345678": {
        "id": '012345678',
        "title": 'Quickbooks',
        "description": 'Quickbooks Description here...',
        "menu": [
            {
                "icon": 'settings',
                "title": 'Settings',
                "state": 'settings'
            }
        ],
        "bar": {
            "title": '',
            "buttons": [
                {
                    "text": "Install",
                    "icon": "plus-circle",
                    "event": "installQuickbooks"
                }
            ]
        }, 
        "imports": []
    }
}

var messageContainer;
var callbacks = {
    init: function(msg) {
        var uiStyle = document.createElement('link');
        uiStyle.type = 'text/css';
        uiStyle.rel = 'stylesheet';
        uiStyle.href = msg.cssUrl;
        document.getElementsByTagName('head')[0].appendChild(uiStyle);

        uiStyle.onload = function () {
            postMsg({callback: 'cssLoaded'});
        };  
    },

    setData: function(msg) {
        // dev only
        if(messageContainer) {
            messageContainer.innerHTML = '<div layout="row">' +
                '<div flex layout="row" layout-align="start stretch" class="padding-sm">' + 
                    '<en-panel flex layout="row" class="padding margin-bottom-collapse panel-overview-highlights panel-overview-success">' + 
                        '<en-icon icon="briefcase" class="xl"></en-icon>' + 
                        '<div flex class="text-right">' +
                            '<div class="uppercase">' + msg.client.clientId + '</div>' + 
                            '<small>' + msg.client.domain + '</small>' + 
                        '</div>' + 
                    '</en-panel>' +
                '</div>' + 
                '<div flex layout="row" layout-align="start stretch" class="padding-sm">' + 
                    '<en-panel flex layout="row" class="padding margin-bottom-collapse panel-overview-highlights panel-overview-warn">' + 
                        '<en-icon icon="box-storage" class="xl"></en-icon>' + 
                        '<div flex class="text-right">' +
                            '<div>' + msg.client.site.alias + '</div>' + 
                            '<small>' + msg.client.site.name + '</small>' + 
                        '</div>' + 
                    '</en-panel>' +
                '</div>' + 
                '<div flex layout="row" layout-align="start stretch" class="padding-sm">' + 
                    '<en-panel flex layout="row" class="padding margin-bottom-collapse panel-overview-highlights panel-overview-info">' + 
                        '<en-icon icon="employee" class="xl"></en-icon>' + 
                        '<div flex class="text-right">' +
                            '<div>' + msg.user.alias + '</div>' + 
                            '<small>' + msg.user.username + '</small>' + 
                        '</div>' + 
                    '</en-panel>' +
                '</div>' + 
            '</div>';
        }

        // have to pass something saying which app it is
        // may not be necessary as apps should be isolated
        var data = {};    
        data.callback = 'receiveAppInfo';
        data.app = apps[msg.appName];

        postMsg(data);
    },

    setState: function(msg) {
        console.log('I\'ve got a new app state', msg.state);
        // change your app state or location

        var panelEl = document.getElementById('list-panel');

        switch(msg.state) {
            case 'ordersList':
                panelEl.className += ' show-list';
                break;
            case 'customerList': 
                panelEl.className += ' show-list';
                break;
            default: 
                break;
        }

        var data = {};
        data.callback = 'appStateChanged';

        postMsg(data);
    },

    setEvent: function(msg) {
        console.log('Button event', msg);
        // do stuff for button events
    }
};

window.onload = function() {
    messageContainer = document.getElementById('message');
    window.addEventListener('message', receiveMessage, false);
}

function receiveMessage(ev) {
    // console.log('receive message to iFrame');

    if(ev.origin !== 'http://localhost:3000') return;

    var message = ev.data;
    if(!message.callback) return;

    callbacks[message.callback](message);
}

function postMsg(message) {
    var parentOrigin = window.location.ancestorOrigins[0];
    var parentWindow = window.parent;

    parentWindow.postMessage(message, parentOrigin);
}
