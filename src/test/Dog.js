/**
 * Created by shuyi.wu on 2015/4/1.
 */
import Animal from './Animal';

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

    getColor(){
        console.log(this.color);
    }
}

export default Dog;