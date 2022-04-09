
let map;


function main(){
    map=new Map(800,600);
    let editor=document.getElementById("editor");
    editor.addEventListener("mousemove",mousemove);
    editor.addEventListener("mouseup",mouseup);
}


function mousemove(event){
    map.onMouseMove(event.pageX,event.pageY);
}

function mouseup(event){
    map.onMouseUp(event.pageX,event.pageY);
}

function addItem(e){
    map.addItem();
}