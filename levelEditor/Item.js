class Item{
    constructor(x,y,w,h){
        this.div=document.createElement("div");
        this.div.classList.add("itemBox");
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.div.style.top=y+"px";
        this.div.style.left=x+"px";
        this.div.style.width=w+"px";
        this.div.style.height=h+"px";
    }
}