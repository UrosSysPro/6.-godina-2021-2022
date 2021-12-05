let mainDiv;
let mapDiv;
let startMx;
let startMy;
let mapX;
let mapY;
let isMouseDown;
let selectedItemToEdit;

let itemsDiv;
let map;

function load(){
    mapDiv=document.getElementById("map");
    mainDiv=document.getElementById("main");
    itemsDiv=document.getElementById("items");
    isMouseDown=false;
    map=new GameMap(mapDiv,itemsDiv);
    
    mainDiv.addEventListener("mousedown",function(e){
        console.log("main");
        startMx=e.offsetX;
        startMy=e.offsetY;
        mapX=mapDiv.offsetLeft;
        mapY=mapDiv.offsetTop;
        isMouseDown=true;
    });
    mainDiv.addEventListener("mouseup",function(){isMouseDown=false});
    // mainDiv.addEventListener("mouseleave",function(){isMouseDown=false;});
    mainDiv.addEventListener("mousemove",function(e){
        if(!isMouseDown)return;
        mapDiv.style.left=mapX+e.offsetX-startMx+"px";
        mapDiv.style.top=mapY+e.offsetY-startMy+"px";
    });
   
}

function addItem(){
    map.addItem(200,200,100,20);

}
