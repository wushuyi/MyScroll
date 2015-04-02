/**
 * Created by shuyi.wu on 2015/4/2.
 */
var easeOutCubic = function(pos) {
    'use strict';
    return (Math.pow((pos - 1), 3) + 1);
};

var easeInOutCubic = function(pos) {
    'use strict';
    if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 3);
    }

    return 0.5 * (Math.pow((pos - 2), 3) + 2);
};

export var easeOutCubic = easeOutCubic;
export var easeInOutCubic = easeInOutCubic;
