/**
 * Created by shuyi.wu on 2015/4/1.
 */
/**
 * use: get browser engine name
 */

let win = window,
    doc = document,
    docStyle = doc.documentElement.style,
    engine;
if (win.opera && Object.prototype.toString.call(win.opera) === '[object Opera]') {
    engine = 'presto';
} else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
} else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
} else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
}

export default engine;

