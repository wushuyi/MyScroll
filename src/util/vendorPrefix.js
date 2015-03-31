/**
 * Created by shuyi.wu on 2015/4/1.
 */
import engine from './detectEngine';

var allPrefixJs,
    allPrefixCss,
    vendorPrefixJs,
    vendorPrefixCss;

allPrefixJs= {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
};
allPrefixCss = {
    trident: '-ms-',
    gecko: '-moz-',
    webkit: '-webkit-',
    presto: '-o-'
};
vendorPrefixJs = allPrefixJs[engine];
vendorPrefixCss = allPrefixCss[engine];

export var js =  vendorPrefixJs;
export var css =  vendorPrefixCss;