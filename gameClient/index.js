let ws;
let canvas;
let context;
let game;
let w;
let h;


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

    

    ws.onmessage=function(message){
        context.clearRect(0,0,500,500);
        let sent=JSON.parse(message.data);
        for(let i=0;i<sent.locations.length;i++){
            context.translate(sent.locations[i].x,sent.locations[i].y);
            context.rotate(sent.locations[i].a);
            context.fillRect(-10,-10,20,20);
            context.rotate(-sent.locations[i].a);
            context.translate(-sent.locations[i].x,-sent.locations[i].y);
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