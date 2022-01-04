let ws;
let game;
let interval;

function main(){
    let canvas=document.getElementsByTagName("canvas")[0];
    let w=window.innerWidth;
    let h=window.innerHeight;

    

    ws=new WebSocket("ws://localhost:5000");
    game=new Game(canvas,w,h,ws);
    ws.onopen=function(){
        console.log("connection opened")
        game.connectionOpened=true;
    };
    ws.onmessage=function(message){
        game.onmessage(message);
    };
    ws.onclose=function(){
        console.log("server close");
        game.connectionOpened=false;
    };
    ws.onerror=function(){
        console.log("server error");
        game.connectionOpened=false;
    };
    loop();
}

function loop(){
    try{
        // interval=requestAnimationFrame(loop);
        game.draw();
    }catch(e){
        cancelAnimationFrame(interval);
    }
}