class Game{
    constructor(canvas,w,h,ws){
        this.ws=ws;

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
    draw(){
        this.context.clearRect(0,0,this.w,this.h);
        this.drawPlayers();
        // this.drawBullets();
        // this.drawWalls();
    }
    drawPlayers(){
        for(let i=0;i<this.players.length;i++){
            let x=this.players[i].x;
            let y=this.players[i].y;
           
            this.context.fillRect(x,y,20,20);
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
            for(let i=0;i<locations.length;i++){
                this.players[i].x=locations[i].x;
                this.players[i].y=locations[i].y;
            }
            locations=message.bulletLocations;
            for(let i=0;i<locations.length;i++){
                this.bullets[i].x=locations[i].x;
                this.bullets[i].y=locations[i].y;
            }
        }
        if(message.type=="removePlayer"){
            this.players.splice(message.playerId,1);
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
}