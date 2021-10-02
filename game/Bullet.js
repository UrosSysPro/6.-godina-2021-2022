class Bullet extends Block{
    constructor(x,y,vx,vy,world){
        let v=new b2Vec2(vx,vy);
        v.Normalize();
        v.Multiply(10);
        x+=v.x;
        y+=v.y;
        super(x,y,3,3,world);
        
        this.body.SetLinearVelocity(v);
    }
    update(){
        
    }
    draw(context){
        super.draw(context);
    }
}