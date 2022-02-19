let scale=40;
let Box2D=require("box2dweb");

let	b2BodyDef = Box2D.Dynamics.b2BodyDef
,	b2Body = Box2D.Dynamics.b2Body
,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
,   b2CircleShape=Box2D.Collision.Shapes.b2CircleShape;

class Bullet{
    constructor(x,y,r,vx,vy,damage,owner,world){
        var fixDef = new b2FixtureDef();
        fixDef.density = 1.0;
        fixDef.friction = 0.2;
        fixDef.restitution = 0.7;
        fixDef.shape = new b2CircleShape();
        fixDef.shape.SetRadius(r/scale);
        this.r=r;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = x/scale;
        bodyDef.position.y = y/scale;
        bodyDef.linearVelocity.x=vx;
        bodyDef.linearVelocity.y=vy;
        bodyDef.linearDamping=0;

        this.damage=damage;
        this.toDelete=false;
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

exports.Bullet=Bullet;