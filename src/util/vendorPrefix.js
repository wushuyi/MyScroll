/**
 * Created by shuyi.wu on 2015/4/1.
 */
import engine from './detectEngine';

var allPrefixJs,
    allPrefixCss,
    allPrefixJsStyle,
    vendorPrefixJs,
    vendorPrefixCss,
    vendorPrefixJsStyle;

allPrefixJs = {
    trident: 'ms',
    gecko: 'moz',
    webkit: 'webkit',
    presto: 'o'
};

allPrefixCss = {
    trident: '-ms-',
    gecko: '-moz-',
    webkit: '-webkit-',
    presto: '-o-'
};

allPrefixJsStyle= {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
};

vendorPrefixJs = allPrefixJs[engine];
vendorPrefixCss = allPrefixCss[engine];
vendorPrefixJsStyle = allPrefixJsStyle[engine];


export var js =  vendorPrefixJs;
export var css =  vendorPrefixCss;
export var style =  vendorPrefixJsStyle;