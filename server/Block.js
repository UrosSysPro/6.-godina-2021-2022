let scale=40;
let Box2D=require("box2dweb");

let	b2BodyDef = Box2D.Dynamics.b2BodyDef
,	b2Body = Box2D.Dynamics.b2Body
,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

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
        this.fixture.SetUserData(this);
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
}

exports.Block=Block;