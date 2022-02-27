const Block=require("./Block").Block;
const Box2D=require("box2dweb");
let b2Body=Box2D.Dynamics.b2Body;
class Wall extends Block{
    constructor(wallInfo,world){
        super(wallInfo.x,wallInfo.y,wallInfo.w,wallInfo.h,world);
        this.body.SetType(b2Body.b2_staticBody)
    }
}

exports.Wall=Wall;