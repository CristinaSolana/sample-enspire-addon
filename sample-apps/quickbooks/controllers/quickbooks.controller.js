childApp.controller('quickbooksCtrl', componentController);

function componentController($scope, $rootScope, $state, childAppService, quickbooksService) {
    var self = this;

    self.salesMockData = childAppService.getSalesMockData();

    self.customerMockData = childAppService.getCustomerMockData();

    var callbacks = {
        onRequestAuth: function(msg) {
            console.info('onRequestAuth init, send back whatever is needed TBD');
            // send some auth stuff we need
            postMsg({action: 'onAuth'});
        },

        onPlatformData: function(msg) {
            var uiStyle = document.createElement('link');
            uiStyle.type = 'text/css';
            uiStyle.rel = 'stylesheet';
            uiStyle.href = msg.cssUrl;
            document.getElementsByTagName('head')[0].appendChild(uiStyle);

            // Why am I putting this on $rootScope, you might ask: because I am a bad person. And a lazy person.
            // And I want the data to persist while I press back button in parent app. Be better than me. Use a service or post to an API.
            $rootScope.platformData = msg;
            $scope.$apply();

            // have to pass something saying which app it is
            // may not be necessary as apps should be isolated
            var data = {};    
            data.action = 'onAppInfo';
            data.app = quickbooksService.getApp();

            postMsg(data);

            uiStyle.onload = function () {
                postMsg({action: 'onCssLoaded'});
            };
        },

        onStateChange: function(msg) {
            console.info('app state changed', msg.state);
            // change your app state or location

            var panelEl = document.getElementById('list-panel');

            switch(msg.state) {
                case 'someStateName':
                    $state.go('someStateName');
                    break;
                default: 
                    break;
            }

            var data = {};
            data.action = 'onAppStateChanged';

            postMsg(data);
        },

        onButtonEvent: function(msg) {
            console.log('Button event', msg);
            // do stuff for button events
        }
    };

    $scope.$on('$viewContentLoaded', function() {
        window.addEventListener('message', receiveMessage, false);
    });

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
            console.log('You\'re trying to be slick. Origin', ev.origin, 'not allowed.');
            return;
        }

        var message = ev.data;
        if(!message.action) return;

        callbacks[message.action](message);
    }
}