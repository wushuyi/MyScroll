/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */

	var effect = _interopRequire(__webpack_require__(1));

	console.log(effect);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */
	/**
	 * use: create a effect obj
	 */
	"use strict";

	__webpack_require__(2);

	var win = window;
	var time = Date.now || function () {
	    "use strict";
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
	effect.stop = function (id) {
	    "use strict";
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
	effect.isRunning = function (id) {
	    "use strict";
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
	effect.start = function (stepCallback, verifyCallback, completedCallback, duration, easingMethod) {
	    "use strict";
	    var start = time();
	    var lastFrame = start;
	    var percent = 0;
	    var dropCounter = 0;
	    var id = counter++;

	    // Compacting running db automatically every few new animations
	    if (id % 20 === 0) {
	        var newRunning = {};
	        for (var usedId in running) {
	            if (running.hasOwnProperty(usedId)) {
	                newRunning[usedId] = true;
	            }
	        }
	        running = newRunning;
	    }

	    // This is the internal step method which is called every few milliseconds
	    var step = (function (_step) {
	        var _stepWrapper = function step(_x) {
	            return _step.apply(this, arguments);
	        };

	        _stepWrapper.toString = function () {
	            return _step.toString();
	        };

	        return _stepWrapper;
	    })(function (virtual) {

	        // Normalize virtual value
	        var render = virtual !== true;

	        // Get current time
	        var now = time();

	        // Verification is executed before next animation step
	        if (!running[id] || verifyCallback && !verifyCallback(id)) {

	            running[id] = null;
	            if (completedCallback) {
	                completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
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
	            if (completedCallback) {
	                completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration === null);
	            }
	        } else if (render) {
	            lastFrame = now;
	            win.requestAnimFrame(step);
	        }
	    });

	    // Mark as running
	    running[id] = true;

	    // Init first step
	    win.requestAnimFrame(step);

	    // Return unique animation ID
	    return id;
	};

	module.exports = effect;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */
	/**
	 * use: polyfill standard requestAnimationFrame and cancelAnimationFrame
	 */

	var vendorPrefix = _interopRequireWildcard(__webpack_require__(3));

	var win = window;
	var lastTime = 0;
	/**
	 * get standard requestAnimationFrame
	 */
	win.requestAnimationFrame = win.requestAnimationFrame || win[vendorPrefix.js + "RequestAnimationFrame"];
	/**
	 * get standard cancelAnimationFrame
	 */
	win.cancelAnimationFrame = win.cancelAnimationFrame || win[vendorPrefix.js + "CancelAnimationFrame"] || win[vendorPrefix.js + "CancelRequestAnimationFrame"];
	/**
	 * polyfill requestAnimationFrame
	 * @param callback
	 * @returns {number}
	 */
	var polyfillRequestAnimationFrame = function requestAnimationFrame(callback) {
	  "use strict";
	  var currTime = new Date().getTime();
	  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	  var id = win.setTimeout(function () {
	    callback(currTime + timeToCall);
	  }, timeToCall);
	  lastTime = currTime + timeToCall;
	  return id;
	};
	/**
	 * polyfill cancelAnimationFrame
	 * @param id {number} requestAnimationFrame id
	 */
	var polyfillCancelAnimationFrame = function cancelAnimationFrame(id) {
	  "use strict";
	  clearTimeout(id);
	};

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */
	/**
	 * use: get browser prefix
	 */

	var engine = _interopRequire(__webpack_require__(4));

	var allPrefixJs, allPrefixCss, allPrefixJsStyle, vendorPrefixJs, vendorPrefixCss, vendorPrefixJsStyle;

	allPrefixJs = {
	    trident: "ms",
	    gecko: "moz",
	    webkit: "webkit",
	    presto: "o"
	};

	allPrefixCss = {
	    trident: "-ms-",
	    gecko: "-moz-",
	    webkit: "-webkit-",
	    presto: "-o-"
	};

	allPrefixJsStyle = {
	    trident: "ms",
	    gecko: "Moz",
	    webkit: "Webkit",
	    presto: "O"
	};

	vendorPrefixJs = allPrefixJs[engine];
	vendorPrefixCss = allPrefixCss[engine];
	vendorPrefixJsStyle = allPrefixJsStyle[engine];

	var js = vendorPrefixJs;
	exports.js = js;
	var css = vendorPrefixCss;
	exports.css = css;
	var style = vendorPrefixJsStyle;
	exports.style = style;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */
	/**
	 * use: get browser engine name
	 */

	"use strict";

	var win = window;
	var doc = document;
	var docStyle = doc.documentElement.style;
	var engine;
	if (win.opera && Object.prototype.toString.call(win.opera) === "[object Opera]") {
	    engine = "presto";
	} else if ("MozAppearance" in docStyle) {
	    engine = "gecko";
	} else if ("WebkitAppearance" in docStyle) {
	    engine = "webkit";
	} else if (typeof navigator.cpuClass === "string") {
	    engine = "trident";
	}

	module.exports = engine;

/***/ }
/******/ ]);