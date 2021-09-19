let canvas;
let context;
let w;
let h;
let player;
let frameCounter;



function load(){
    canvas=document.getElementsByTagName("canvas")[0];
    w=window.innerWidth;
    h=window.innerHeight;

    canvas.width=w;
    canvas.height=h;

    context=canvas.getContext("2d");

    player=new Player(w/2,h/2,30,30);
    // context.fillStyle="#00ef7f";
    // context.rect(100,100,200,150);
    // context.stroke();
    // context.fill();
    frameCounter=0;
    loop();
}

function loop(){
    requestAnimationFrame(loop);
    frameCounter++;
    let pocetnoVreme=Date.now();
    
    // for(let i=0;i<1000;i++)
    player.draw(context);
    
    let ft=Date.now()-pocetnoVreme;

    let fps=Math.round(1000/ft);
    if(frameCounter>60){
        document.getElementById("fps").innerHTML=Math.min(fps,5000);
        frameCounter=0;
    }
    
    // input();
    // update();
    // draw();
}