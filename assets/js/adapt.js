var adaptUILayout = (function() {
    var regulateScreen = (function() {
        var cache = {};
        var defSize = {
            width: window.screen.width,
            height: window.screen.height
        };

        var ver = window.navigator.appVersion;
        var s = window.orientation;
        var _ = null;

        var check = function(key) {
            return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
        };

        var add = function(name, key, size) {
            if (name && key) cache[name] = {
                key: key,
                size: size
            };
        };

        var del = function(name) {
            if (cache[name]) delete cache[name];
        };
        var cal = function() {
            if (_ != null) return _;

            for (var name in cache) {
                if (check(cache[name].key)) {
                    _ = cache[name].size;
                    break;
                }
            }

            if (_ == null) _ = defSize;

            return _;
        };
        return {
            add: add,
            del: del,
            cal: cal,
            s: s
        };
    })();

    var adapt = function(uiWidth) {

        var deviceWidth, devicePixelRatio, targetDensitydpi,
        //meta,
            initialContent, head, viewport, ua;
        var Eviewport = document.getElementById('viewport');
        ua = navigator.userAgent.toLowerCase();
        isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;

        devicePixelRatio = window.devicePixelRatio;
        devicePixelRatio < 1.5 ? 2 : devicePixelRatio;

        if (window.orientation == 0 || window.orientation == 180) {
            if (regulateScreen.s != 0) {
                if (regulateScreen.cal().width < regulateScreen.cal().height) {
                    deviceWidth = regulateScreen.cal().width;
                } else {
                    deviceWidth = regulateScreen.cal().height;
                }
            } else {
                deviceWidth = regulateScreen.cal().width;
            }
        } else {
            if (regulateScreen.s != 0) {
                if (regulateScreen.cal().width > regulateScreen.cal().height) {
                    deviceWidth = regulateScreen.cal().width;
                } else {
                    deviceWidth = regulateScreen.cal().height;
                }
            } else {
                deviceWidth = regulateScreen.cal().height;
            }
        }

        if (devicePixelRatio == 2 && (deviceWidth == 320 || deviceWidth == 360 || deviceWidth == 592 || deviceWidth == 640)) {
            deviceWidth *= 2;
        };
        if (devicePixelRatio == 1.5 && (deviceWidth == 320)) {
            deviceWidth *= 2;
            devicePixelRatio = 2;
        };
        if (devicePixelRatio == 1.5 && (deviceWidth == 640)) {
            devicePixelRatio = 2;
        };

        targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
        initialContent = isiOS ? 'width=' + uiWidth + 'px, user-scalable=no': 'target-densitydpi=' + targetDensitydpi + ', width=' + uiWidth + ', user-scalable=no';
        Eviewport ? Eviewport.remove(this) : null;
        head = document.getElementsByTagName('head');
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.id = 'viewport';
        viewport.content = initialContent;

        if (isiOS && window.orientation != 0 && window.orientation != 180) {
            viewport.content = 'width=640';
            head.length > 0 && head[head.length - 1].appendChild(viewport);
        } else {
            head.length > 0 && head[head.length - 1].appendChild(viewport);
        }
    };
    return {
        regulateScreen: regulateScreen,
        adapt: adapt
    };
})();

adaptUILayout.adapt(640);
window.addEventListener('orientationchange', function(){
    adaptUILayout.adapt(640);
});