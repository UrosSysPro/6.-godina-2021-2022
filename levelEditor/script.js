let mainDiv;
let mapDiv;
let startMx;
let startMy;
let mapX;
let mapY;
let isMouseDown;
let selectedItemToEdit;
let editInputs;
let rangeInputs;

let itemsDiv;
let map;

function load(){
    mapDiv=document.getElementById("map");
    mainDiv=document.getElementById("main");
    itemsDiv=document.getElementById("items");

    editInputs=document.getElementsByClassName("editInput");
    for(let i=0;i<editInputs.length;i++){
        editInputs[i].addEventListener("input",changeItem);
    }
    rangeInputs=document.getElementsByClassName("rangeInput");
    rangeInputs[0].addEventListener("input",changeItem);

    isMouseDown=false;
    map=new GameMap(mapDiv,itemsDiv,editInputs,rangeInputs);
    
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
    map.addItem(200,200,100,20,45);
}


function changeItem(){
    console.log("change ");
    map.changeItem();
}