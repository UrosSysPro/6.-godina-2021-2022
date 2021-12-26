let ws;
let canvas;
let context;
let game;
let w;
let h;
let mx;
let my;


function load(){
    document.body.style.margin=0;
    document.body.style.overflow="none";
    w=window.innerWidth;
    h=window.innerHeight;

    ws=new WebSocket("ws://localhost:5000");
    canvas=document.getElementsByTagName("canvas")[0];
    context=canvas.getContext("2d");

    canvas.width=w;
    canvas.height=h;

    document.body.addEventListener("keydown",keyDown);
    document.body.addEventListener("keyup",keyUp);
    document.body.addEventListener("mousemove",mouseMove);
    

    ws.onmessage=function(message){
        context.clearRect(0,0,w,h);
        let sent=JSON.parse(message.data);
        for(let i=0;i<sent.locations.length;i++){
            context.translate(sent.locations[i].x,sent.locations[i].y);
            context.rotate(sent.locations[i].a);
            context.fillStyle="#000";
            context.fillRect(-10,-10,20,20);

            context.fillStyle="#00ef7f";
            context.rotate(sent.locations[i].lookingAt);
            context.fillRect(0,0,40,10);
            context.rotate(-sent.locations[i].lookingAt);


            context.rotate(-sent.locations[i].a);
            context.translate(-sent.locations[i].x,-sent.locations[i].y);

            if(sent.locations[i].me){
                let smerx=mx-sent.locations[i].x;
                let smery=my-sent.locations[i].y;
                let inte=Math.sqrt(smerx*smerx+smery*smery);
                smerx/=inte;
                smery/=inte;

                let lookingAt=Math.acos(smerx);
                if(smery<0)lookingAt=-lookingAt;
        
                let toSend={
                    type:"mouseMove",
                    lookingAt:lookingAt
                };
                ws.send(JSON.stringify(toSend));
            }
        }
    }
    ws.onopen=function(){
        console.log("open");
    }
    ws.onclose=function(){
        console.log("close");
    }
    ws.onerror=function(){
        console.log("error");
    }
    
}

function keyDown(event){
    console.log(event.key);
    let toSend={
        type:"keyPressed",
        key:event.key
    }
    ws.send(JSON.stringify(toSend));
}
function keyUp(event){
    let toSend={
        type:"keyReleased",
        key:event.key
    }
    ws.send(JSON.stringify(toSend));
}

function mouseMove(event){
   mx=event.x;
   my=event.y;
}


// let ws;
// let game;

// function load(){
//     ws=new WebSocket("ws://localhost:5000");
//     document.body.style.margin="0";
//     document.body.style.overflow="hidden";
//     w=window.innerWidth;
//     h=window.innerHeight;
//     let canvas=document.getElementsByTagName("canvas")[0];

//     document.body.addEventListener("keydown",keyDown);
//     document.body.addEventListener("keyup",keyUp);

//     game=new Game(canvas,w,h,ws);
// }

// function loop(){
//     requestAnimationFrame(loop);
//     game.draw();
// }

// function keyDown(event){
//     game.keyDown(event.key);
// }
// function keyUp(event){
//     game.keyUp(event.key);
// }