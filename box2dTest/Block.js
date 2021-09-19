let scale=40;

class Block{
    constructor(x,y,w,h,world){
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(w/scale, h/scale);
        this.w=w;
        this.h=h;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = x/scale;
        bodyDef.position.y = y/scale;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixDef);
    }
    getX(){
        return this.body.GetPosition().x*scale;
    }
    getY(){
        return this.body.GetPosition().y*scale;
    }
}