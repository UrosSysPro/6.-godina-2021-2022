class Item{
    constructor(x,y,w,h,a){
        this.div=document.createElement("div");
        this.div.classList.add("itemBox");
        this.update(x,y,w,h,a);
        // console.log(this.div);
    }
    update(x,y,w,h,a){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.a=a;
        // console.log(a);
        this.div.style.top=y+"px";
        this.div.style.left=x+"px";
        this.div.style.width=w+"px";
        this.div.style.height=h+"px";
        this.div.style.transform="rotate("+a+"deg)";
    }
}