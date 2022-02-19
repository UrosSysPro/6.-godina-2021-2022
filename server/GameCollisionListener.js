let Box2d=require("box2dweb");
let Player=require("./Player").Player;
let Bullet=require("./Bullet").Bullet;
let b2World=Box2d.Dynamics.b2World;
let b2Vec2 = Box2d.Common.Math.b2Vec2;
let b2ContactListener=Box2d.Dynamics.b2ContactListener;

class GameCollisionListener extends b2ContactListener{
    constructor(game){
        // this.game=game;
        super();
    }
    BeginContact(contact) {
        let b1=contact.GetFixtureA().GetUserData();
        let b2=contact.GetFixtureB().GetUserData();
        
        if(b1 instanceof Bullet && b2 instanceof Player){
            b2.hit(b1);
        }
        if(b2 instanceof Bullet && b1 instanceof Player){
            b1.hit(b2);
        }
    }
    EndContact(contact){
        // console.log("nema contact");
    }
}
exports.GameCollisionListener=GameCollisionListener;