/**
 * Created by shuyi.wu on 2015/4/1.
 */
/**
 * use: create a effect obj
 */
import'./polyfillAnimationFrame';

var win = window;
var time = Date.now || function() {
        'use strict';
        return +new Date();
    };
var desiredFrames = 60;
var millisecondsPerSecond = 1000;
var running = {};
var counter = 1;
var effect = {};
/**
 *
 * @param id
 * @returns {boolean}
 */
effect.stop = function(id) {
    'use strict';
    var cleared = running[id] !== null;
    if (cleared) {
        running[id] = null;
    }

    return cleared;
};
/**
 *
 * @param id
 * @returns {boolean}
 */
effect.isRunning = function(id) {
    'use strict';
    return running[id] !== null;
};
/**
 *
 * @param stepCallback
 * @param verifyCallback
 * @param completedCallback
 * @param duration
 * @param easingMethod
 * @returns {number}
 */
effect.start = function(stepCallback, verifyCallback, completedCallback, duration, easingMethod) {
    'use strict';
    var start = time();
    var lastFrame = start;
    var percent = 0;
    var dropCounter = 0;
    var id = counter++;

    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
        var newRunning = {};
        for (var usedId in running) {
            if(running.hasOwnProperty(usedId)){
                newRunning[usedId] = true;
            }
        }
        running = newRunning;
    }

    // This is the internal step method which is called every few milliseconds
    var step = function(virtual) {

        // Normalize virtual value
        var render = virtual !== true;

        // Get current time
        var now = time();

        // Verification is executed before next animation step
        if (!running[id] || (verifyCallback && !verifyCallback(id))) {

            running[id] = null;
            if(completedCallback){
                completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
            }
            return;

        }

        // For the current rendering to apply let's update omitted steps in memory.
        // This is important to bring internal state variables up-to-date with progress in time.
        if (render) {

            var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
            for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
                step(true);
                dropCounter++;
            }

        }

        // Compute percent value
        if (duration) {
            percent = (now - start) / duration;
            if (percent > 1) {
                percent = 1;
            }
        }

        // Execute step callback, then...
        var value = easingMethod ? easingMethod(percent) : percent;
        if ((stepCallback(value, now, render) === false || percent === 1) && render) {
            running[id] = null;
            if(completedCallback){
                completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration === null);
            }
        } else if (render) {
            lastFrame = now;
            win.requestAnimFrame(step);
        }
    };

    // Mark as running
    running[id] = true;

    // Init first step
    win.requestAnimFrame(step);

    // Return unique animation ID
    return id;
};

export default effect;