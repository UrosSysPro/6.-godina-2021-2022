let Block=require("./Block").Block;
let Bullet=require("./Bullet").Bullet;

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

        this.lookingAt=0;

        this.fireCooldown=100;
        this.lastTimeFired=0;
        this.firing=false;
        this.bullets=[];
    }
    update(time){
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
        
        if(this.firing&&(time-this.lastTimeFired>this.fireCooldown)){
            this.lastTimeFired=time;
            let world=this.body.GetWorld();
            let r=3;
            let vx=Math.cos(this.lookingAt)*15;
            let vy=Math.sin(this.lookingAt)*15;
            let x=this.getX()+2*vx;
            let y=this.getY()+2*vy;
            this.bullets.push(new Bullet(x,y,r,vx,vy,world));
        }

        this.body.SetLinearVelocity(v);
    }
}

exports.Player=Player;