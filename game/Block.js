let scale=40;

class Block{
    constructor(x,y,w,h,world){
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.2;
        fixDef.restitution = 0.7;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(w/scale, h/scale);
        this.w=w;
        this.h=h;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = x/scale;
        bodyDef.position.y = y/scale;
        bodyDef.linearDamping=0;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixDef);
    }
    getX(){
        return this.body.GetPosition().x*scale;
    }
    getY(){
        return this.body.GetPosition().y*scale;
    }
    getA(){
        return this.body.GetAngle();
    }
    draw(context){
        let x=this.getX();
        let y=this.getY();
        let a=this.getA();
        context.translate(x,y);
        context.rotate(a);
        context.fillRect(-this.w,-this.h,2*this.w,2*this.h);
        context.rotate(-a);
        context.translate(-x,-y);
    }
}