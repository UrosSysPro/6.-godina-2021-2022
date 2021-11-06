let Block=require("./Block").Block;


class Player extends Block{
    constructor(x,y,w,h,world,ws){
        super(x,y,w,h,world);
        this.ws=ws;
    }
    update(){
        
    }
}

exports.Player=Player;