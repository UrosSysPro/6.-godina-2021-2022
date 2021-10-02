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
let debugCanvas;
let canvas;
let context;
let blokovi;
let world;
let w;
let h;
let  player;

function load(){
    canvas=document.getElementsByTagName("canvas")[0];
    w=500;
    h=500;
    canvas.width=w;
    canvas.height=h;
    context=canvas.getContext("2d");
    canvas.addEventListener("click",click);
    document.body.addEventListener("keydown",keydown);
    document.body.addEventListener("keyup",keyup);

    world=new b2World(new b2Vec2(0,0),false);

    blokovi=[];
    blokovi.push(new Block(w/2,h-10,w/2,10,world));
    blokovi.push(new Block(w/2,10,w/2,10,world));
    blokovi.push(new Block(10,h/2,10,h/2,world));
    blokovi.push(new Block(w-10,h/2,10,h/2,world));
    for(let i=0;i<blokovi.length;i++){
        blokovi[i].body.SetType(b2Body.b2_staticBody);
    }
    player=new Player(w/2,h/2,10,10,world);
    loop();
}

function loop(){
    requestAnimationFrame(loop);
    update();
    draw();
}
function update(){
    world.Step(1/60,10,10);
}
function draw(){
    context.clearRect(0,0,500,500);
    for(let i=0;i<blokovi.length;i++){
        blokovi[i].draw(context);
    }
    player.draw(context);
}

function click(event){
    console.log(event.x+" "+event.y);
    blokovi.push(new Block(event.x,event.y,20,20,world));
    blokovi[blokovi.length-1].body.SetLinearVelocity(new b2Vec2(30,30));
}

function keydown(event){
    // console.log(event);
    if(event.key=="w"){
        player.keyUp=true;
    }
}

function keyup(event){
    // console.log(event);
    if(event.key=="w"){
        player.keyUp=true;
    }
}