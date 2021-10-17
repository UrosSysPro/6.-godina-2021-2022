let maxBulletSpeed=20;
class Bullet extends Block{
    constructor(x,y,vx,vy,world){
        let v=new b2Vec2(vx,vy);
        v.Normalize();
        v.Multiply(maxBulletSpeed);
        x+=v.x*3;
        y+=v.y*3;
        super(x,y,3,3,world);
        this.createdTime=Date.now();
        this.timeExisting=3000;
        this.body.SetLinearVelocity(v);
        this.damage=1;
    }
    update(){
        if(Date.now()-this.createdTime>this.timeExisting){
            let index=bullets.indexOf(this);
            world.DestroyBody(this.body);
            bullets.splice(index,1);
        }
    }
    draw(context){
        super.draw(context);
    }
}