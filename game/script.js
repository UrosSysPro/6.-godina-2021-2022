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
let bullets;
let world;
let w;
let h;
let  player;
let mx;
let my;
let isMouseDown;
let frameCounter;
function load(){
    canvas=document.getElementsByTagName("canvas")[0];
    w=500;
    h=500;
    canvas.width=w;
    canvas.height=h;
    context=canvas.getContext("2d");
    // canvas.addEventListener("click",click);
    canvas.addEventListener("mousedown",mousedown);
    canvas.addEventListener("mouseup",mouseup);
    canvas.addEventListener("mousemove",mousemove);
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
    bullets=[];
    player=new Player(w/2,h/2,20,20,world);
    frameCounter=0;
    loop();
}

function loop(){
    requestAnimationFrame(loop);
    update();
    draw();
}
function update(){
    frameCounter=(frameCounter+1)%60;
    player.update();
    if(isMouseDown){
        let x=player.getX();
        let y=player.getY();
        let vx=mx-x;
        let vy=my-y;

        bullets.push(new Bullet(x,y,vx,vy,world));
    }
    if(bullets.length>200){
        world.DestroyBody(bullets[0].body);
        bullets.shift();
    }
    world.Step(1/60,10,10);
}
function draw(){
    context.clearRect(0,0,500,500);
    for(let i=0;i<blokovi.length;i++){
        blokovi[i].draw(context);
    }
    for(let i=0;i<bullets.length;i++){
        bullets[i].draw(context);
    }
    player.draw(context);
}

function click(event){
    console.log(event.x+" "+event.y);
    // blokovi.push(new Block(event.x,event.y,20,20,world));
    // blokovi[blokovi.length-1].body.SetLinearVelocity(new b2Vec2(30,30));
    let x=player.getX();
    let y=player.getY();
    let vx=event.x-x;
    let vy=event.y-y;

    blokovi.push(new Bullet(x,y,vx,vy,world));
}
function mousedown(event){
    mx=event.clientX;
    my=event.clientY;
    isMouseDown=true;
}
function mousemove(event){
    mx=event.x;
    my=event.y;
}
function mouseup(event){
    isMouseDown=false;
}

function keydown(event){
    console.log(event);
    if(event.key=="w"){
        player.keyUp=true;
    }
    if(event.key=="s"){
        player.keyDown=true;
    }
    if(event.key=="a"){
        player.keyLeft=true;
    }
    if(event.key=="d"){
        player.keyRight=true;
    }
}

function keyup(event){
    // console.log(event);
    if(event.key=="w"){
        player.keyUp=false;
    }
    if(event.key=="s"){
        player.keyDown=false;
    }
    if(event.key=="a"){
        player.keyLeft=false;
    }
    if(event.key=="d"){
        player.keyRight=false;
    }
}