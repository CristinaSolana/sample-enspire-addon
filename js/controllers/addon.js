childApp.controller('childAppCtrl', componentController);

function componentController($scope, childAppService) {
    var self = this;

    self.salesMockData = childAppService.getSalesMockData();

    self.customerMockData = childAppService.getCustomerMockData();

    // may not be necessary as apps should be isolated
    var apps = childAppService.getApps();

    var callbacks = {
        init: function(msg) {
            var uiStyle = document.createElement('link');
            uiStyle.type = 'text/css';
            uiStyle.rel = 'stylesheet';
            uiStyle.href = msg.cssUrl;
            document.getElementsByTagName('head')[0].appendChild(uiStyle);

            uiStyle.onload = function () {
                postMsg({action: 'cssLoaded'});
            };  
        },

        setData: function(msg) {
            self.parentAppInfo = msg;
            $scope.$apply();

            // have to pass something saying which app it is
            // may not be necessary as apps should be isolated
            var data = {};    
            data.action = 'receiveAppInfo';
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
            data.action = 'appStateChanged';

            postMsg(data);
        },

        setEvent: function(msg) {
            console.log('Button event', msg);
            // do stuff for button events
        }
    };

    window.onload = function() {
        window.addEventListener('message', receiveMessage, false);
    };

    // send postMessage
    // @param {object} message object data to send with postMessage
    function postMsg(message) {
        var parentOrigin = window.location.ancestorOrigins[0];
        var parentWindow = window.parent;

        parentWindow.postMessage(message, parentOrigin);
    }

    // receive postMessage
    // @param {object} ev event object from postMessage
    function receiveMessage(ev) {
        if(ev.origin.indexOf('retailpoint.com') === -1 && ev.origin.indexOf('enspireplatform.com') === -1) {
            console.log('origin', ev.origin, 'not allowed.');
            return;
        }

        var message = ev.data;
        if(!message.action) return;

        callbacks[message.action](message);
    }
}