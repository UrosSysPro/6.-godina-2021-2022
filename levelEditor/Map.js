class Map{
    static map;
    constructor(w,h){
        this.w=w;
        this.h=h;
        this.editor=document.getElementById("editor");
        this.editor.addEventListener("mousemove",function(event){
            event.stopPropagation();
            //console.log(event.clientX,event.clientY);
        });
        this.items=[];
        this.div=document.createElement("div");
        this.div.classList.add("map");
        this.div.addEventListener("mousedown",function(event){
            map.onMouseDown(event.pageX,event.pageY,event.target);
            event.stopPropagation();
        });
        this.editor.appendChild(this.div);
        this.x=100;
        this.y=0;

        this.setUpInputs();

        this.currentSelectedIndex=-2;
        this.startMousePosition={x:0,y:0};
        this.isMouseDown=false;
        
        this.moveMap();
    }
    setUpInputs(){
        this.propertyInputs=document.getElementsByTagName("input");
        let inputs=this.propertyInputs;
        for(let i=0;i<4;i++){
            this.propertyInputs[i*2+1].min=0;
            this.propertyInputs[i*2+1].max=this.w>this.h?this.w:this.h;
        }

        for(let i=0;i<2;i++){
            inputs[0+i].addEventListener("input",function(event){
                if(map.currentSelectedIndex==-1||map.currentSelectedIndex==-2)return;
                let x=event.target.value;
                map.items[map.currentSelectedIndex].x=x;
                map.items[map.currentSelectedIndex].update();
                map.setInputsForCurrentIndex();
            });
        }
    }
    setInputsForCurrentIndex(){
        if(this.currentSelectedIndex==-1||this.currentSelectedIndex==-2)return;
        let inputs=this.propertyInputs;
        let index=this.currentSelectedIndex;
        let items=this.items;
        inputs[0].value=items[index].x;
        inputs[1].value=items[index].x;
        inputs[2].value=items[index].y;
        inputs[3].value=items[index].y;
        inputs[4].value=items[index].w;
        inputs[5].value=items[index].w;
        inputs[6].value=items[index].h;
        inputs[7].value=items[index].h;
    }
    moveMap(){
        this.div.style.top=this.y+"px";
        this.div.style.left=this.x+"px";
        this.div.style.width=this.w+"px";
        this.div.style.height=this.h+"px";
    }
    onMouseDown(x,y,target){
        let index=-1;
        for(let i=0;i<this.items.length;i++)
            if(this.items[i].div==target){
                index=i;
                break;
            }
        this.currentSelectedIndex=index;
        this.setInputsForCurrentIndex();
        for(let i=0;i<this.items.length;i++){
            this.items[i].div.classList.remove("selectedItem");
        }
        if(index!=-1){
            this.items[index].div.classList.add("selectedItem");
        }
        this.startMousePosition={x,y};
        this.isMouseDown=true;
    }
    onMouseMove(x,y){
        if(this.isMouseDown==false)return;
        if(this.currentSelectedIndex==-2)return;
        if(this.currentSelectedIndex==-1){
            let divX=this.x+x-this.startMousePosition.x;
            let divY=this.y+y-this.startMousePosition.y;
            this.setDiv({x:divX,y:divY});
            return;
        }
        let divX=this.items[this.currentSelectedIndex].x+x-this.startMousePosition.x;
        let divY=this.items[this.currentSelectedIndex].y+y-this.startMousePosition.y;
        this.items[this.currentSelectedIndex].setDiv({x:divX,y:divY});

    }
    onMouseUp(x,y){

        if(this.currentSelectedIndex==-2)return;
        if(this.currentSelectedIndex==-1){
            let divX=this.x+x-this.startMousePosition.x;
            let divY=this.y+y-this.startMousePosition.y;
            this.x=divX;
            this.y=divY;
            this.update();
            this.isMouseDown=false;
            return;
        }
        let divX=this.items[this.currentSelectedIndex].x+x-this.startMousePosition.x;
        let divY=this.items[this.currentSelectedIndex].y+y-this.startMousePosition.y;
        this.items[this.currentSelectedIndex].x=divX;
        this.items[this.currentSelectedIndex].y=divY;
        this.items[this.currentSelectedIndex].update();
        this.isMouseDown=false;
    }
    addItem(){
        let item=new Item(this.w/2,this.h/2,100,20,0);
        this.items.push(item);
        this.div.appendChild(item.div);
        item.div.addEventListener("mousedown",function(event){
            map.onMouseDown(event.pageX,event.pageY,event.target);
            event.stopPropagation();
        });
    }

    update(){
        this.div.style.width=this.w+"px";
        this.div.style.height=this.h+"px";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.div.style.transform=`rotate(${this.a}deg)`;
    }
    setDiv(info){
        if(info.w!=undefined)this.div.style.width=info.w+"px";
        if(info.h!=undefined)this.div.style.height=info.h+"px";
        if(info.x!=undefined)this.div.style.left=info.x+"px";
        if(info.y!=undefined)this.div.style.top=info.y+"px";
        if(info.a!=undefined)this.div.style.transform=`rotate(${info.a}deg)`;
    }
}