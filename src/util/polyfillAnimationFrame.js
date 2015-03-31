/**
 * Created by shuyi.wu on 2015/4/1.
 */
import * as vendorPrefix from './vendorPrefix';

var win = window;
var lastTime = 0;

win.requestAnimationFrame = win.requestAnimationFrame ||
win[vendorPrefix.js + 'RequestAnimationFrame'];

win.cancelAnimationFrame = win.cancelAnimationFrame ||
win[vendorPrefix.js + 'CancelAnimationFrame'] ||
win[vendorPrefix.js + 'CancelRequestAnimationFrame'];

if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = function(callback) {
        'use strict';
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = win.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!win.cancelAnimationFrame) {
    win.cancelAnimationFrame = function(id) {
        'use strict';
        clearTimeout(id);
    };
}

win.requestAnimFrame = win.requestAnimationFrame;