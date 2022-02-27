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
        this.health=100;

        this.fireCooldown=100;
        this.maxBullets=100;
        this.lastTimeFired=0;
        this.firing=false;
        this.bullets=[];

        this.skinId=0;
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
        let intenzitet=Math.sqrt(v.x*v.x+v.y*v.y);
        if(intenzitet>this.maxSpeed){
            v.x/=intenzitet;
            v.y/=intenzitet;
            v.x*=this.maxSpeed;
            v.y*=this.maxSpeed;
        }
        
        let world=this.body.GetWorld();
           
        for(let i=0;i<this.bullets.length;i++){
            if(this.bullets[i].toDelete){
                world.DestroyBody(this.bullets[0].body);
                this.bullets.splice(i,1);
                i--;
            }
        }

        if(this.firing&&(time-this.lastTimeFired>this.fireCooldown)){
            this.lastTimeFired=time;
            let r=3;

            let vx=Math.cos(this.lookingAt)*15;
            let vy=Math.sin(this.lookingAt)*15;
            // let vx=Math.cos(this.lookingAt)*1;
            // let vy=Math.sin(this.lookingAt)*1;
           
            let x=this.getX()+2*vx;
            let y=this.getY()+2*vy;
            let damage=10;
            let owner=this;

            this.bullets.push(new Bullet(x,y,r,vx,vy,damage,owner,world));

            if(this.bullets.length>this.maxBullets){
                world.DestroyBody(this.bullets[0].body);
                this.bullets.shift();
            }
        }

        this.body.SetLinearVelocity(v);
    }

    hit(bullet){
        if(bullet.owner!=this){
            this.health-=bullet.damage;
        }
        bullet.toDelete=true;
    }
}

exports.Player=Player;