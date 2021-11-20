class Game{
    constructor(canvas,w,h){
        this.canvas=canvas;
        this.context=canvas.getContext("2d");
        canvas.width=w;
        canvas.height=h;
        this.w=w;
        this.h=h;

        this.players=[];
        this.myId;
        this.bullets=[];
        this.walls=[];
    }
    draw(){
        drawPlayers();
        drawBullets();
        drawWalls();
    }
    drawPlayers(){
        for(let i=0;i<this.players.length;i++){
            
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
            let locations=message.bulletLocations;
            for(let i=0;i<locations.length;i++){
                this.bullets[i].x=locations[i].x;
                this.bullets[i].y=locations[i].y;
            }
        }
        if(message.type=="removePlayer"){
            this.players.splice(message.playerId,1);
        }
    }
}