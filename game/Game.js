let Box2d=require("box2dweb");
let b2World=Box2d.Dynamics.b2World;
let b2Vec2 = Box2d.Common.Math.b2Vec2;
let GameCollisionListener=require("./GameCollisionListener").GameCollisionListener;
let Player=require("./Player").Player;
let Wall=require("./Wall").Wall;

class Game{
    constructor(w,h){
        this.connections=[];
        this.w=w;
        this.h=h;
        this.world=new b2World(new b2Vec2(0,0),false);
        this.world.SetContactListener(new GameCollisionListener(this));
        this.players=[];
        this.currentLevel={
            spawnPoint:{x:0,y:0},
            walls:[],
            decoration:[]
        };
        this.loadLevel("levels/level1.json");
    }
    update(){
        let time=Date.now();
        let toDelete=[];
        for(let i=0;i<this.players.length;i++){
            this.players[i].update(time);
            if(!this.players[i].isAlive){
               toDelete.push(this.players[i]);
            }
        }
        for(let i=0;i<toDelete.length;i++){
            toDelete[i].ws.send(JSON.stringify({type:"killed"}));
            toDelete[i].ws.close();
        }
        this.world.Step(1/60,5,5);
    }
    addPlayer(x,y,w,h,ws){
        //napravimo playera i obavestimo ga o ostalim igracima i zidovima
        this.players.push(new Player(x,y,w,h,this.world,ws));
        let toSend={
            type:"init",
            players:[],
            walls:[],
            myId:this.players.length-1,
        };
        for(let i=0;i<this.players.length;i++){
            toSend.players.push({
                x:this.players[i].getX(),
                y:this.players[i].getY(),
                w:this.players[i].w,
                h:this.players[i].h,
                a:this.players[i].getA(),
                lookingAt:this.players[i].lookingAt,
                skinId:this.players[i].skinId,
                weaponId:this.players[i].weaponIndex
            });
        }
        for(let i=0;i<this.currentLevel.walls.length;i++){
            toSend.walls.push({
                x:this.currentLevel.walls[i].getX(),
                y:this.currentLevel.walls[i].getY(),
                w:this.currentLevel.walls[i].w,
                h:this.currentLevel.walls[i].h,
            });
        }
        ws.send(JSON.stringify(toSend));
        //obavestimo sve igrace da je ubacen igrac
        toSend={
            type:"playerAdded",
            newPlayer:{
                x:x,
                y:y,
                w:w,
                h:h,
                skinId:this.players[this.players.length-1].skinId,
                weaponId:this.players[this.players.length-1].weaponIndex
            }
        };
        toSend=JSON.stringify(toSend);
        for(let i=0;i<this.players.length-1;i++){
            this.players[i].ws.send(toSend);
        }
    }
    removePlayer(index){
        this.players[index].delete();
        // this.world.DestroyBody(this.players[index].body);
        this.players.splice(index,1);
        //obavestiti sve da je izbrisan player
        for(let i=0;i<this.players.length;i++){
            this.players[i].ws.send(JSON.stringify({
                type:"playerRemoved",
                myId:i,
                playerId:index
            }));
        }
    }
    
    send(){
        let toSend={
            type:"updateLocations",
            playerLocations:[],
            bulletLocations:[]
        }   
        for(let i=0;i<this.players.length;i++){
            toSend.playerLocations.push({
                x:this.players[i].getX(),
                y:this.players[i].getY(),
                lookingAt:this.players[i].lookingAt,
                health:this.players[i].health, 
            });
            for(let j=0;j<this.players[i].bullets.length;j++){
                toSend.bulletLocations.push({
                    x:this.players[i].bullets[j].getX(),
                    y:this.players[i].bullets[j].getY(),
                    r:this.players[i].bullets[j].r,
                });
            }
        }
        toSend = JSON.stringify(toSend);

        for(let i=0;i<this.players.length;i++){
            this.players[i].ws.send(toSend);
        }
    }
    onmessage(index,message){
        let p=JSON.parse(message.data);
        if(p.type=="keyPressed"){
            let player=this.players[index];
            if(p.key=="w")this.players[index].keyUp=true;
            if(p.key=="s")this.players[index].keyDown=true;
            if(p.key=="a")this.players[index].keyLeft=true;
            if(p.key=="d")this.players[index].keyRight=true;
            if(p.key=="q"){
                player.weaponIndex--;
                if(player.weaponIndex<0){
                    player.weaponIndex=player.weapons.length-1;
                }
                let toSend={
                    type:"weaponChanged",
                    weaponId:player.weaponIndex,
                    id:index
                }
                toSend=JSON.stringify(toSend);
                for(let a of this.players){
                    a.ws.send(toSend);
                }
            }
            if(p.key=="e"){
                player.weaponIndex=(player.weaponIndex+1)%player.weapons.length;
                let toSend={
                    type:"weaponChanged",
                    weaponId:player.weaponIndex,
                    id:index
                }
                toSend=JSON.stringify(toSend);
                for(let a of this.players){
                    a.ws.send(toSend);
                }
            };
        }
        if(p.type=="keyReleased"){
            if(p.key=="w")this.players[index].keyUp=false;
            if(p.key=="s")this.players[index].keyDown=false;
            if(p.key=="a")this.players[index].keyLeft=false;
            if(p.key=="d")this.players[index].keyRight=false;
        }
        if(p.type=="mouseMove"){
            this.players[index].lookingAt=p.lookingAt;
        }
        if(p.type=="mouseDown"){
            this.players[index].firing=true;
        }
        if(p.type=="mouseUp"){
            this.players[index].firing=false;
        }
        if(p.type=="ping"){
            let toSend={
                type:"pong"
            }
            this.players[index].ws.send(JSON.stringify(toSend));
        }
    }

    loadLevel(fileName){
        const fs = require('fs')
        
        try {
            const data = fs.readFileSync(fileName, 'utf8')
            let level=JSON.parse(data);
            this.currentLevel=level;
            for(let i=0;i<level.walls.length;i++){
                level.walls[i]=new Wall(level.walls[i],this.world);
            }
        } catch (err) {
          console.error(err)
        }
    }
}

exports.Game=Game;