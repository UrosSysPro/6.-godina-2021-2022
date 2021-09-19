class Player{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.color="#515151";
    }
    draw(context){
        context.fillStyle=this.color;
        context.fillRect(this.x,this.y,this.w,this.h);
    }
}