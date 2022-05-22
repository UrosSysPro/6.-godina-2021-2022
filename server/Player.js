let Block=require("./Block").Block;
let Bullet=require("./Bullet").Bullet;
let Weapon=require("./Weapon").Weapon;

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
        this.isAlive=true;


        this.weapons=[
            new Weapon(9,10,10,100),
            new Weapon(9,30,5,300),
        ];
        this.weaponIndex=0;
        // this.fireCooldown=100;
        this.maxBullets=10000;
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
           
        
        let i=0;
        while(i<this.bullets.length){
            if(this.bullets[i].toDelete){
                world.DestroyBody(this.bullets[i].body);
                this.bullets.splice(i,1);
                continue;
            }
            i++;
        }
        let weapon=this.weapons[this.weaponIndex];
        if(this.firing&&(time-this.lastTimeFired>weapon.cooldown)){
            this.lastTimeFired=time;

            let r=weapon.bulletRadius;

            let bulletSpeed=weapon.speed;
            let vx=Math.cos(this.lookingAt)*bulletSpeed;
            let vy=Math.sin(this.lookingAt)*bulletSpeed;
            // let vx=Math.cos(this.lookingAt)*1;
            // let vy=Math.sin(this.lookingAt)*1;
           
            
            // let x=this.getX()+weapon.bulletRadius;
            // let y=this.getY()+weapon.bulletRadius;

            let x=this.getX()+Math.cos(this.lookingAt)*(Math.sqrt(2)*weapon.bulletRadius+20);
            let y=this.getY()+Math.sin(this.lookingAt)*(Math.sqrt(2)*weapon.bulletRadius+20);
            let damage=weapon.damage;
            let owner=this;

            this.bullets.push(new Bullet(x,y,r,vx,vy,damage,owner,world));

            if(this.bullets.length>this.maxBullets){
                world.DestroyBody(this.bullets[0].body);
                this.bullets.shift();
            }
        }

        this.body.SetLinearVelocity(v);

        if(this.health<=0){
            this.isAlive=false;
        }
    }

    hit(bullet){
        if(bullet.owner!=this){
            this.health-=bullet.damage;
        }
        bullet.toDelete=true;
    }

    delete(){
        let world=this.body.GetWorld();
        world.DestroyBody(this.body);
        for(let i=0;i<this.bullets.length;i++){
            world.DestroyBody(this.bullets[i].body);
        }
    }
}

exports.Player=Player;
