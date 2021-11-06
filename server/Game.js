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
    onmessage(ws,message){

    }
}

exports.Game=Game;