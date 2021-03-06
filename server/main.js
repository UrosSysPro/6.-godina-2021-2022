let WebSocket=require("ws");
let Game=require("./Game").Game;

let game=new Game(500,500);

let server=new WebSocket.Server({port:5000});


server.on("connection",function(ws){
    console.log("povezano");
    game.addPlayer(game.w/2,game.h/2,10,10,ws);
    game.connections.push(ws);

    ws.onclose=function(){
        console.log("close neko je izasao");
        let index=game.connections.indexOf(ws);
        game.connections.splice(index,1);
        game.removePlayer(index);
    };
    ws.onerror=function(){
        console.log("error neko je izasao");
        let index=game.connections.indexOf(ws);
        game.connections.splice(index,1);
        game.removePlayer(index);
    };
    ws.onmessage=function(message){
        game.onmessage(game.connections.indexOf(ws),message);
    }
});

let interval=setInterval(function() {
    game.update();
    game.send();
}, 1000/60);

