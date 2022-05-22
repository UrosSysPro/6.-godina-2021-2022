class Item{
    constructor(x,y,w,h,a){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.a=a;
        this.div=document.createElement("div");
        this.div.classList.add("item");
        this.update();
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
        // console.log(info);
    }
}