class Player extends Block{
    constructor(x,y,w,h,world){
        super(x,y,w,h,world);
        this.body.SetFixedRotation(true);
        this.keyUp=false;
        this.keyDown=false;
        this.keyLeft=false;
        this.keyRight=false;
    }
    update(){
        
    }
    draw(context){
        
    }
}