let Block=require("./Block").Block;


class Player extends Block{
    constructor(x,y,w,h,world,ws){
        super(x,y,w,h,world);
        this.body.SetFixedRotation(true);
        this.body.SetLinearDamping(3);
        this.ws=ws;
        this.keyUp=false;
        this.keyDown=false;
        this.keyLeft=false;
        this.keyRight=false;
        this.maxSpeed=10;
        this.acceleration=4;
    }
    update(){
        let v=this.body.GetLinearVelocity();
        // v.x=0;
        // v.y=0;
        if(this.keyUp){
            v.y-=this.acceleration;
            v.y=v.y<-this.maxSpeed?-this.maxSpeed:v.y;
        }
        if(this.keyDown){
            v.y+=this.acceleration;
            v.y=v.y>this.maxSpeed?this.maxSpeed:v.y;
        }
        if(this.keyLeft){
            v.x-=this.acceleration;
            v.x=v.x<-this.maxSpeed?-this.maxSpeed:v.x;
        }
        if(this.keyRight){
            v.x+=this.acceleration;
            v.x=v.x>this.maxSpeed?this.maxSpeed:v.x;
        }
        
        this.body.SetLinearVelocity(v);
    }
}

exports.Player=Player;