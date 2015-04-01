/**
 * Created by shuyi.wu on 2015/4/1.
 */
class Animal{
    /**
     *
     * @param name
     */
    constructor(name){
        this.name = name;
    }
    saylll(){
        console.log('lalala!');
    }

    /**
     *
     * @param msg
     */
    say(msg){
        console.log(this.name + ' say : ' + msg);
    }
}

export default Animal;