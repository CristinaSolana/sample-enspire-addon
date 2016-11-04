childApp.factory('postMessageService', componentService);

function componentService($rootScope) {
    var evSource, evOrigin, cssUrl;

    var self = {
        receiveMessage: receiveMessage,
        sendData: sendData
    };

    var actions = {
        onRequestAuth: function(msg) {
            console.info('onRequestAuth init, send back whatever is needed TBD');
            // send requested auth data, secret key or whatever we decide
            postMsg({action: 'onAuth'});
        },

        onPlatformData: function(msg) {
            cssUrl = msg.cssUrl;
            $rootScope.$emit('pm:platformDataReceived', msg);
        },

        onStateChange: function(msg) {
            console.info('app state changed', msg.state);

            var data = {};
            data.action = 'onAppStateChanged';

            postMsg(data);

            $rootScope.$emit("pm:appStateChanged", {state: msg.state});
        },

        onButtonEvent: function(msg) {
            console.info('Button event', msg);
            // do stuff for button events

            $rootScope.$emit("pm:buttonEvent", {btnEvent: msg.event});
        }
    };

    return self;

    function sendData(appData) {
        var uiStyle = document.createElement('link');
        uiStyle.type = 'text/css';
        uiStyle.rel = 'stylesheet';
        uiStyle.href = cssUrl;
        document.getElementsByTagName('head')[0].appendChild(uiStyle);

        // have to pass something saying which app it is
        var data = {};
        data.action = 'onAppInfo';
        data.app = appData;

        postMsg(data);

        uiStyle.onload = function () {
            postMsg({action: 'onCssLoaded'});
        };
    }

    // receive postMessage
    // @param {object} ev event object from postMessage
    function receiveMessage(ev) {
        console.info('Add-on receiveMessage');
        if(ev.origin.indexOf('retailpoint.com') === -1 && ev.origin.indexOf('enspireplatform.com') === -1) {
            console.log('You\'re trying to be slick. Origin', ev.origin, 'not allowed.');
            return;
        }

        var message = ev.data;
        if(!message.action) return;

        seteventSource(ev.source);
        setEventOrigin(ev.origin);

        actions[message.action](message)
    }

    function seteventSource(src) {
        evSource = src;
    }

    function setEventOrigin(org) {
        evOrigin = org;
    }

    // send postMessage
    // @param {object} message object data to send with postMessage
    function postMsg(message) {
        evSource.postMessage(message, evOrigin);
    }
}