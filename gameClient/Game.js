class Game{
    constructor(canvas,w,h,ws){
        this.connectionOpened=false;
        this.ws=ws;
        this.camera={
            x:w/2,
            y:h/2,
            a:0,
            scale:1
        };

        this.mx=w/2;
        this.my=h/2;

        this.lookingAt=0;

        this.canvas=canvas;
        this.context=canvas.getContext("2d");
        canvas.width=w;
        canvas.height=h;
        this.w=w;
        this.h=h;

        this.players=[];
        this.myId=-1;
        this.bullets=[];
        this.walls=[];
    }
    updateCamera(){
        if(this.myId==-1)return;
        this.camera.x=-this.players[this.myId].x+this.w/2;
        this.camera.y=-this.players[this.myId].y+this.h/2;
        
        // this.camera.x/=this.camera.scale;
        // this.camera.y/=this.camera.scale;

        this.camera.x+=(this.w/2-this.mx)/3;
        this.camera.y+=(this.h/2-this.my)/3;
    }
    draw(){
        this.updateCamera()

        this.context.clearRect(0,0,this.w,this.h);
        
        this.context.translate(this.camera.x,this.camera.y);
        this.context.rotate(this.camera.a);
        this.context.scale(this.camera.scale,this.camera.scale);

        this.drawPlayers();
        // this.drawBullets();
        // this.drawWalls();
        
        this.context.scale(1/this.camera.scale,1/this.camera.scale);
        this.context.rotate(-this.camera.a);
        this.context.translate(-this.camera.x,-this.camera.y);
    }
    

    drawPlayers(){
       
        for(let i=0;i<this.players.length;i++){
            let x=this.players[i].x;
            let y=this.players[i].y;
            let w=this.players[i].w;
            let h=this.players[i].h;
            let a=this.players[i].a;
            let lookingAt=this.players[i].lookingAt;

            this.context.fillStyle="#000";

            this.context.translate(x,y);
            this.context.rotate(a);
            this.context.fillRect(-w,-h,w*2,h*2);
            
            this.context.fillStyle="#00ef7f";

            this.context.rotate(lookingAt);
            this.context.fillRect(0,-2.5,w*2,5);
            this.context.rotate(-lookingAt);

            this.context.rotate(-a);
            this.context.translate(-x,-y);
        }
    }

    onmessage(message){
        message=JSON.parse(message.data);

        if(message.type=="init"){
            this.players=message.players;
            this.walls=message.walls;
            this.myId=message.myId;
        }
        if(message.type=="updateLocations"){
            let locations=message.playerLocations;
            let len=this.players.length<locations.length?this.players.length:locations.length;
    
            for(let i=0;i<len;i++){
                this.players[i].x=locations[i].x;
                this.players[i].y=locations[i].y;
                this.players[i].lookingAt=locations[i].lookingAt;
            }
            locations=message.bulletLocations;
            len=this.bullets.length<locations.length?this.bullets.length:locations.length;
    
            for(let i=0;i<len;i++){
                this.bullets[i].x=locations[i].x;
                this.bullets[i].y=locations[i].y;
            }
        }
        if(message.type=="playerRemoved"){
            this.myId=message.myId;
            this.players.splice(message.playerId,1);
        }
        if(message.type=="playerAdded"){
            this.players.push(message.newPlayer);
        }
    }

    keyDown(key){
        let toSend={
            type:"keyPressed",
            key:key
        }
        ws.send(JSON.stringify(toSend));
    }
    keyUp(key){
        let toSend={
            type:"keyReleased",
            key:key
        }
        ws.send(JSON.stringify(toSend));
    }
    mouseMove(e){
        this.mx=e.x;
        this.my=e.y;

        let x=this.mx-this.w/2;
        let y=this.my-this.h/2;
        let i=Math.sqrt(x*x+y*y);
        x/=i;
        y/=i;
        this.lookingAt=Math.acos(x);
        this.lookingAt*=y>0?1:-1;
        let toSend={
            type:"mouseMove",
            lookingAt:this.lookingAt
        }
        this.ws.send(JSON.stringify(toSend));
    }
    resize(){
        this.w=window.innerWidth;
        this.h=window.innerHeight;
        this.canvas.width=this.w;
        this.canvas.height=this.h;
    }
}