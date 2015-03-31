/**
 * Created by shuyi.wu on 2015/4/1.
 */
import engine from './util/detectEngine';
import * as vendorPrefix from './util/vendorPrefix';

console.log('浏览器内核: '+engine);
console.log('产商js前缀:'+vendorPrefix.js);
console.log('产商css前缀' +vendorPrefix.css);