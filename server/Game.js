let Box2d=require("box2dweb");
let b2World=Box2d.Dynamics.b2World;
let b2Vec2 = Box2d.Common.Math.b2Vec2;

let Player=require("./Player").Player;

class Game{
    constructor(w,h){
        this.w=w;
        this.h=h;
        this.world=new b2World(new b2Vec2(0,0),false);
        this.players=[];
    }
    update(){
        for(let i=0;i<this.players.length;i++){
            this.players[i].update();
        }
        this.world.Step(1/60,5,5);
    }
    addPlayer(x,y,w,h,ws){
        this.players.push(new Player(x,y,w,h,this.world,ws));
    }
    removePlayer(index){
        this.world.DestroyBody(this.players[index].body);
        this.players.splice(index,1);
    }
    send(){
        let toSend={
            locations:[]
        };
        for(let i=0;i<this.players.length;i++){
            toSend.locations.push({
                x:this.players[i].getX(),
                y:this.players[i].getY(),
                a:this.players[i].getA()
            });
        }
        toSend=JSON.stringify(toSend);
        for(let i=0;i<this.players.length;i++){
            this.players[i].ws.send(toSend);
        }
    }
    onmessage(index,message){
        let p=JSON.parse(message.data);
        if(p.type=="keyPressed"){
            if(p.key=="w")this.players[index].keyUp=true;
            if(p.key=="s")this.players[index].keyDown=true;
            if(p.key=="a")this.players[index].keyLeft=true;
            if(p.key=="d")this.players[index].keyRight=true;
        }
        if(p.type=="keyReleased"){
            if(p.key=="w")this.players[index].keyUp=false;
            if(p.key=="s")this.players[index].keyDown=false;
            if(p.key=="a")this.players[index].keyLeft=false;
            if(p.key=="d")this.players[index].keyRight=false;
        }
    }
}

exports.Game=Game;