var   b2Vec2 = Box2D.Common.Math.b2Vec2
,	b2BodyDef = Box2D.Dynamics.b2BodyDef
,	b2Body = Box2D.Dynamics.b2Body
,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
,	b2Fixture = Box2D.Dynamics.b2Fixture
,	b2World = Box2D.Dynamics.b2World
,	b2MassData = Box2D.Collision.Shapes.b2MassData
,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
;
let canvas;
let blokovi;
let world;

function load(){
    canvas=document.getElementsByTagName("canvas")[0];
    canvas.width=500;
    canvas.height=500;
    canvas.addEventListener("click",click);
    blokovi=[];
    world=new b2World(new b2Vec2(0,10),false);

    var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(canvas.getContext("2d"));
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

    loop();
}

function loop(){
    requestAnimationFrame(loop);
    world.Step(1/60,10,10);
    world.DrawDebugData();
}

function click(event){
    console.log(event.x+" "+event.y);
    blokovi.push(new Block(event.x,event.y,20,20,world));
}