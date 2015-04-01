/**
 * Created by shuyi.wu on 2015/4/1.
 */
import 'babel/polyfill'
//
//class Animal{
//    /**
//     *
//     * @param name
//     */
//    constructor(name){
//        this.name = name;
//    }
//
//    /**
//     *
//     * @param msg
//     */
//    say(msg){
//        console.log(this.name + ' say : ' + msg);
//    }
//}
//
//class Dog extends Animal{
//    /**
//     *
//     * @param name
//     * @param color
//     */
//    constructor(name, color) {
//        super(name);
//        this.color = color;
//    }
//
//    /**
//     *
//     * @param msg
//     */
//    say(msg){
//        console.log('Hello,'+ this.name + ' say : ' + msg);
//    }
//
//    /**
//     *
//     */
//    getColor(){
//        console.log(this.color);
//    }
//}
//
//var dog = new Dog('js', 'red');
//
//dog.say('wow,wow!');
//dog.getColor();
//
//var testFn = function test(){
//  console.log('helloa!');
//};

//var promise = new Promise(function(resolve, reject) {
//    setTimeout(function(){
//        resolve('Promise is ok!');
//    }, 5000);
//});
//
//setTimeout(function(){
//    promise.then(function(value) {
//        console.log(value);
//    }, function(value) {
//        // failure
//    });
//}, 6000);


//const sortNumbers = () =>
//    Array.prototype.slice.call(arguments).sort();

function divide(a, b, { option = false } = {}) {
    console.log(a);
    console.log(b);
    console.log(option);
}
divide(1,2, {
    a: 'sdaf'
});