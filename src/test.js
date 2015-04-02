/**
 * Created by shuyi.wu on 2015/4/2.
 */
import EasyScroller from './easyMyScroll';

// automatically attach an EasyScroller to elements found with the right data attributes
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var elements = document.querySelectorAll('[data-scrollable],[data-zoomable]'), element;

    for (var i = 0; i < elements.length; i++) {

        element = elements[i];
        var scrollable = element.dataset.scrollable;
        var zoomable = element.dataset.zoomable || '';
        var zoomOptions = zoomable.split('-');
        var minZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[0]);
        var maxZoom = zoomOptions.length > 1 && parseFloat(zoomOptions[1]);

        var initObj = new EasyScroller(element, {
            scrollingX: scrollable === 'true' || scrollable === 'x',
            scrollingY: scrollable === 'true' || scrollable === 'y',
            zooming: zoomable === 'true' || zoomOptions.length > 1,
            minZoom: minZoom,
            maxZoom: maxZoom
        });
        initObj = null;
    }
}, false);