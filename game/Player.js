class Player extends Block{
    constructor(x,y,w,h,world){
        super(x,y,w,h,world);
        this.body.SetFixedRotation(true);
        this.body.SetLinearDamping(3);
        this.keyUp=false;
        this.keyDown=false;
        this.keyLeft=false;
        this.keyRight=false;
        this.sprite=new Image();
        this.sprite.src="animacija.png";
        this.spriteW=32;
        this.spriteH=32;
        this.spriteNumber=3;
        this.currentSprite=0;
    }
    update(){
        let v=this.body.GetLinearVelocity();
        if(this.keyUp){
            v.y-=1;
            v.y=v.y<-5?-5:v.y;
        }
        if(this.keyDown){
            v.y+=1;
            v.y=v.y>5?5:v.y;
        }
        if(this.keyLeft){
            v.x-=1;
            v.x=v.x<-5?-5:v.x;
        }
        if(this.keyRight){
            v.x+=1;
            v.x=v.x>5?5:v.x;
        }
        
        this.body.SetLinearVelocity(v);

        if(frameCounter%7==0){
            this.currentSprite=(this.currentSprite+1)%this.spriteNumber;
        }
    }
    draw(context){
        // context.fillStyle="#f1f131";
        super.draw(context);
        //context.fillStyle="#000000";
        let w=this.w*2;
        let h=this.h*2;
        let x=this.getX()-this.w;
        let y=this.getY()-this.h;
        let spriteX=this.currentSprite*this.spriteW;
        x=parseInt(x);
        y=parseInt(y);
        if(this.keyDown||this.keyLeft||this.keyRight||this.keyUp){
            context.drawImage(this.sprite,spriteX,0,this.spriteW,this.spriteH,x,y,w,h);
        }else{
            context.drawImage(this.sprite,0,0,this.spriteW,this.spriteH,x,y,w,h);
        }
        
    }
}