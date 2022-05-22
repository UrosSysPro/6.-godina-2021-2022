class Game{
    constructor(canvas,w,h,ws){
        this.lastPing=0;

        this.connectionOpened=false;
        this.ws=ws;
        this.camera={
            x:w/2,
            y:h/2,
            a:0,
            scale:0.6
        };

        this.mx=w/2;
        this.my=h/2;

        this.canvas=canvas;
        this.context=canvas.getContext("2d");
        
        canvas.width=w;
        canvas.height=h;
        this.context.imageSmoothingEnabled=false;
        this.w=w;
        this.h=h;

        this.players=[];
        this.myId=-1;
        this.bullets=[];
        this.walls=[];

        let img=new Image();
        img.src="unnamed.png";
        this.spriteInfo={
            pad:4,
            sw:32,
            sh:32,
            numberX:4,
            numberY:4
        }
        // console.log(img);
        this.skins=[img];
        
    }
    updateCamera(){
        if(this.myId==-1)return;
        //ova 4 reda sigurno rade
        // this.camera.x=-this.players[this.myId].x+this.w/2;
        // this.camera.y=-this.players[this.myId].y+this.h/2;
        
        // this.camera.x+=(this.w/2-this.mx)/3;
        // this.camera.y+=(this.h/2-this.my)/3;
        
        this.camera.x=-this.players[this.myId].x*this.camera.scale;
        this.camera.y=-this.players[this.myId].y*this.camera.scale;
        this.camera.x+=this.w/2;
        this.camera.y+=this.h/2;
        this.camera.x+=(this.w/2-this.mx)/3;
        this.camera.y+=(this.h/2-this.my)/3;
        
        // this.camera.x/=this.camera.scale;
        // this.camera.y/=this.camera.scale;

    }
    draw(){
        this.updateCamera()

        this.context.clearRect(0,0,this.w,this.h);
        let width=this.w/this.camera.scale;
        let height=this.h/this.camera.scale;

      
        this.context.translate(this.camera.x,this.camera.y);
        this.context.scale(this.camera.scale,this.camera.scale);
        this.context.translate(width/2,height/2);
        this.context.rotate(this.camera.a);
        this.context.translate(-width/2,-height/2);

        this.drawWalls();
        this.drawPlayers();
        this.drawBullets();
        
        
        this.context.translate(width/2,height/2);
        this.context.rotate(-this.camera.a);
        this.context.translate(-width/2,-height/2);
        this.context.scale(1/this.camera.scale,1/this.camera.scale);
        this.context.translate(-this.camera.x,-this.camera.y);
    }
    

    drawPlayers(){
       
        for(let i=0;i<this.players.length;i++){
            let x=this.players[i].x;
            let y=this.players[i].y;
            let w=this.players[i].w;
            let h=this.players[i].h;
            let a=this.players[i].a;
            let health=this.players[i].health;

            let lookingAt=this.players[i].lookingAt;
            let skinId=this.players[i].skinId;

            this.context.fillStyle="#000";

            this.context.translate(x,y);
            this.context.rotate(a);
            // ovde se crta igrac
            // let sx=0+this.spriteInfo.pad;
            // let sy=0+this.spriteInfo.pad;
            // let sw=this.spriteInfo.sw-2*this.spriteInfo.pad;
            // let sh=this.spriteInfo.sh-2*this.spriteInfo.pad;
            let sx=0;
            let sy=0;
            let sw=this.spriteInfo.sw;
            let sh=this.spriteInfo.sh;
            this.context.drawImage(this.skins[skinId],sx,sy,sw,sh,-w,-h,w*2,h*2);
            // this.context.fillRect(-w,-h,w*2,h*2);
            
            this.context.fillStyle="#Af207A";

            this.context.rotate(lookingAt);
            //ovde se crta puska
            this.context.fillRect(0,-2.5,w*2,5);
            this.context.rotate(-lookingAt);


            //ovde se crta health bar
            this.context.fillStyle="#00ef7f"
            let width=(w*2)*health/100;
            this.context.fillRect(-w,-h-5,width,3);

            this.context.rotate(-a);
            this.context.translate(-x,-y);
        }
    }

    drawBullets(){
        for(let i=0;i<this.bullets.length;i++){
            let x=this.bullets[i].x;
            let y=this.bullets[i].y;

            this.context.fillStyle="#000";

            this.context.translate(x,y);
            this.context.beginPath();
            this.context.fillStyle="#000";
            this.context.arc(0,0,2,0,Math.PI*2);
            this.context.closePath();
            this.context.fill();
            this.context.translate(-x,-y);
        }
    }
    drawWalls(){
        for(let i=0;i<this.walls.length;i++){
            let x=this.walls[i].x;
            let y=this.walls[i].y;
            let w=this.walls[i].w;
            let h=this.walls[i].h;
           
            this.context.fillStyle="#000";

            this.context.translate(x,y);

            this.context.fillRect(-w,-h,w*2,h*2);
            
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
                this.players[i].health=locations[i].health;
            }
            // locations=message.bulletLocations;
            // len=this.bullets.length<locations.length?this.bullets.length:locations.length;
    
            // for(let i=0;i<len;i++){
            //     this.bullets[i].x=locations[i].x;
            //     this.bullets[i].y=locations[i].y;
            // }

            this.bullets=message.bulletLocations;
        }
        if(message.type=="playerRemoved"){
            this.myId=message.myId;
            this.players.splice(message.playerId,1);
        }
        if(message.type=="playerAdded"){
            this.players.push(message.newPlayer);
        }
        if(message.type=="pong"){
            console.log("pong");
            console.log(Date.now()-this.lastPing);
        }
        if(message.type=="killed"){
            showMenu();
        }
    }

    keyDown(key){
        let toSend={
            type:"keyPressed",
            key:key
        }
        if(!this.connectionOpened)return;
        ws.send(JSON.stringify(toSend));
    }
    keyUp(key){
        let toSend={
            type:"keyReleased",
            key:key
        }
        if(!this.connectionOpened)return;
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
        if(!this.connectionOpened)return;
        this.ws.send(JSON.stringify(toSend));
    }
    mouseUp(e){
        let toSend={
            type:"mouseUp"
        }
        if(!this.connectionOpened)return;
        this.ws.send(JSON.stringify(toSend));
    }
    mouseDown(e){
        let toSend={
            type:"mouseDown"
        }
        if(!this.connectionOpened)return;
        this.ws.send(JSON.stringify(toSend));
    }
    wheel(e){
        let amount=e.deltaY;
        if(amount>0){
            this.camera.scale*=1.05;
        }else{
            this.camera.scale/=1.05;
        }
        // if(amount>0){
        //     this.camera.a+=0.1;
        // }else{
        //     this.camera.a-=0.1;
        // }
    }
    resize(){
        this.w=window.innerWidth;
        this.h=window.innerHeight;
        this.canvas.width=this.w;
        this.canvas.height=this.h;
        this.context.imageSmoothingEnabled=false;
    }
    ping(){
        console.log("ping");
        this.lastPing=Date.now();
        let toSend={
            type:"ping"
        }
        if(!this.connectionOpened)return;
        this.ws.send(JSON.stringify(toSend));
    }
}