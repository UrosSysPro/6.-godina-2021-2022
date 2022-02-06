let Box2d=require("box2dweb");
let b2World=Box2d.Dynamics.b2World;
let b2Vec2 = Box2d.Common.Math.b2Vec2;
let b2ContactListener=Box2d.Dynamics.b2ContactListener;

class GameCollisionListener extends b2ContactListener{
    constructor(game){
        // this.game=game;
        super();
    }
    BeginContact(contact) {
        console.log("contact");
    }
    EndContact(contact){
        console.log("nema contact");
    }
}
exports.GameCollisionListener=GameCollisionListener;