/**
 * Created by shuyi.wu on 2015/4/1.
 */
/**
 * use: polyfill standard requestAnimationFrame and cancelAnimationFrame
 */
import * as vendorPrefix from './vendorPrefix';
let win = window,
    lastTime = 0;

/**
 * polyfill requestAnimationFrame
 * @param callback
 * @returns {number}
 */
const polyfillRequestAnimationFrame = function requestAnimationFrame(callback) {
    'use strict';
    let currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = win.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);

    lastTime = currTime + timeToCall;
    return id;
};
/**
 * polyfill cancelAnimationFrame
 * @param id {number} requestAnimationFrame id
 */
const polyfillCancelAnimationFrame = function cancelAnimationFrame(id) {
    'use strict';
    clearTimeout(id);
};
/**
 * get standard requestAnimationFrame
 */
win.requestAnimationFrame = win.requestAnimationFrame ||
win[vendorPrefix.js + 'RequestAnimationFrame'];
/**
 * get standard cancelAnimationFrame
 */
win.cancelAnimationFrame = win.cancelAnimationFrame ||
win[vendorPrefix.js + 'CancelAnimationFrame'] ||
win[vendorPrefix.js + 'CancelRequestAnimationFrame'];


if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = polyfillRequestAnimationFrame;
}
if (!win.cancelAnimationFrame) {
    win.cancelAnimationFrame = polyfillCancelAnimationFrame;
}
/**
 * abbreviation
 */
win.requestAnimFrame = win.requestAnimationFrame;