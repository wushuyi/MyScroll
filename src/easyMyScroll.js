/**
 * Created by shuyi.wu on 2015/4/2.
 */
import Scroller from './myScroll';
import {vendorPrefixJsStyle} from './util/vendorPrefix';

class EasyScroller {
    constructor(content, options) {
        this.content = content;
        this.container = content.parentNode;
        this.options = options || {};

        // create Scroller instance
        var that = this;
        this.scroller = new Scroller(function (left, top, zoom) {
            that.render(left, top, zoom);
        }, options);

        this.render = (function () {
            var vendorPrefix = EasyScroller.vendorPrefix = vendorPrefixJsStyle;

            var helperElem = document.createElement('div');
            var undef;

            var perspectiveProperty = vendorPrefix + 'Perspective';
            var transformProperty = vendorPrefix + 'Transform';

            if (helperElem.style[perspectiveProperty] !== undef) {

                return function (left, top, zoom) {
                    this.content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
                };

            } else if (helperElem.style[transformProperty] !== undef) {

                return function (left, top, zoom) {
                    this.content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
                };

            } else {

                return function (left, top, zoom) {
                    this.content.style.marginLeft = left ? (-left / zoom) + 'px' : '';
                    this.content.style.marginTop = top ? (-top / zoom) + 'px' : '';
                    this.content.style.zoom = zoom || '';
                };
            }
        })();

        // bind events
        this.bindEvents();

        // the content element needs a correct transform origin for zooming
        this.content.style[EasyScroller.vendorPrefix + 'TransformOrigin'] = 'left top';

        // reflow for the first time
        this.reflow();
    }


    reflow() {

        // set the right scroller dimensions
        this.scroller.setDimensions(this.container.clientWidth, this.container.clientHeight, this.content.offsetWidth, this.content.offsetHeight);

        // refresh the position for zooming purposes
        var rect = this.container.getBoundingClientRect();
        this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop);

    }

    bindEvents() {

        var that = this;

        // reflow handling
        window.addEventListener('resize', function () {
            that.reflow();
        }, false);

        // touch devices bind touch events
        if ('ontouchstart' in window) {

            this.container.addEventListener('touchstart', function (e) {

                // Don't react if initial down happens on a form element
                if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
                    return;
                }

                that.scroller.doTouchStart(e.touches, e.timeStamp);
                e.preventDefault();

            }, false);

            document.addEventListener('touchmove', function (e) {
                that.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
            }, false);

            document.addEventListener('touchend', function (e) {
                that.scroller.doTouchEnd(e.timeStamp);
            }, false);

            document.addEventListener('touchcancel', function (e) {
                that.scroller.doTouchEnd(e.timeStamp);
            }, false);

            // non-touch bind mouse events
        } else {

            var mousedown = false;

            this.container.addEventListener('mousedown', function (e) {

                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return;
                }

                that.scroller.doTouchStart([{
                    pageX: e.pageX,
                    pageY: e.pageY
                }], e.timeStamp);

                mousedown = true;
                e.preventDefault();

            }, false);

            document.addEventListener('mousemove', function (e) {

                if (!mousedown) {
                    return;
                }

                that.scroller.doTouchMove([{
                    pageX: e.pageX,
                    pageY: e.pageY
                }], e.timeStamp);

                mousedown = true;

            }, false);

            document.addEventListener('mouseup', function (e) {

                if (!mousedown) {
                    return;
                }

                that.scroller.doTouchEnd(e.timeStamp);

                mousedown = false;

            }, false);

            this.container.addEventListener('mousewheel', function (e) {
                if (that.options.zooming) {
                    that.scroller.doMouseZoom(e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
                    e.preventDefault();
                }
            }, false);

        }

    }
}

export default EasyScroller;