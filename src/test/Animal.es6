/**
 * Created by shuyi.wu on 2015/4/1.
 */
import 'babel/polyfill'

class Animal{
    /**
     *
     * @param name
     */
    constructor(name){
        this.name = name;
    }

    /**
     *
     * @param msg
     */
    say(msg){
        console.log(this.name + ' say : ' + msg);
    }
}

class Dog extends Animal{
    /**
     *
     * @param name
     * @param color
     */
    constructor(name, color) {
        super(name);
        this.color = color;
    }

    /**
     *
     * @param msg
     */
    say(msg){
        console.log('Hello,'+ this.name + ' say : ' + msg);
    }

    /**
     *
     */
    getColor(){
        console.log(this.color);
    }
}

var dog = new Dog('js', 'red');
dog.say('wow,wow!');
dog.getColor();

console.log(Dog.name);