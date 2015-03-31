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

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */

	__webpack_require__(3);

	var engine = _interopRequire(__webpack_require__(1));

	var vendorPrefix = _interopRequireWildcard(__webpack_require__(2));

	console.log("浏览器内核: " + engine);
	console.log("产商js前缀: " + vendorPrefix.js);
	console.log("产商css前缀: " + vendorPrefix.css);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by shuyi.wu on 2015/4/1.
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */

	var engine = _interopRequire(__webpack_require__(1));

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

	/**
	 * Created by shuyi.wu on 2015/4/1.
	 */

	var vendorPrefix = _interopRequireWildcard(__webpack_require__(2));

	var win = window;
	var lastTime = 0;

	win.requestAnimationFrame = win.requestAnimationFrame || win[vendorPrefix.js + "RequestAnimationFrame"];

	win.cancelAnimationFrame = win.cancelAnimationFrame || win[vendorPrefix.js + "CancelAnimationFrame"] || win[vendorPrefix.js + "CancelRequestAnimationFrame"];

	if (!win.requestAnimationFrame) {
	    win.requestAnimationFrame = function (callback) {
	        "use strict";
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = win.setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	}

	if (!win.cancelAnimationFrame) {
	    win.cancelAnimationFrame = function (id) {
	        "use strict";
	        clearTimeout(id);
	    };
	}

	win.requestAnimFrame = win.requestAnimationFrame;

/***/ }
/******/ ]);