let ws;
let game;
let interval;

function main(){
    let canvas=document.getElementsByTagName("canvas")[0];
    let w=window.innerWidth;
    let h=window.innerHeight;

    if(ws!=undefined)ws.close();

    ws=new WebSocket("ws://localhost:5000");
    game=new Game(canvas,w,h,ws);

    document.body.addEventListener("mousemove",mouseMove);
    document.body.addEventListener("keydown",keyDown);
    document.body.addEventListener("keyup",keyUp);
    document.body.addEventListener("mousedown",mouseDown);
    document.body.addEventListener("mouseup",mouseUp);
    
    // document.body.addEventListener("resize",resize);

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
    interval=requestAnimationFrame(loop);
    game.draw();
}

function mouseMove(e){
    // console.log(e.x+" "+e.y);
    game.mouseMove(e);
}

function keyUp(e){
    // console.log(e.key);
    game.keyUp(e.key);
}
function keyDown(e){
    // console.log(e);
    game.keyDown(e.key);
}
function resize(){
    game.resize();
}

function mouseUp(e){
    game.mouseUp(e);
}
function mouseDown(e){
    game.mouseDown(e);
}

function ping(){
    game.ping();
}
function wheel(e){
    game.wheel(e);
}


function startGame(e){
    let pages=document.getElementsByClassName("pages")[0];
    pages.style.display="none";
    let playAgain=document.getElementById("playAgain");
    playAgain.style.display="none";
    main();
}
// function hideMenu(){
//     let pages=document.getElementsByClassName("pages")[0];
//     pages.style.display="none";
// }
function showMenu(){
    let playAgain=document.getElementById("playAgain");
    playAgain.style.display="flex";
}

function lvlSelect() {
    console.log("level select");
    let selectDiv=document.getElementById('lvlSelect');
    console.log(selectDiv);
    selectDiv.classList.toggle('invisible');
}