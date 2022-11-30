var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

///-------

matrix = []

function random(a, b){
    return Math.floor(Math.random() * b)
}

function MatrixGenerator(rows, columns){
    for (let y = 0; y < rows; y++) {
        matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
            for (let x = 0; x < columns; x++) {
                let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 70) {
                matrix[y][x] = 0; // Մատրիցի 75 տոկոսը կլինի 0
            }
                if (a >= 70 && a < 83) {
                matrix[y][x] = 1; // Մատրիցի 8 տոկոսը կլինի 1
            }
            else if (a >= 83 && a < 90) {
                matrix[y][x] = 2; // Մատրիցի 7 տոկոսը կլինի 2
            }
            else if (a >= 90 && a < 95) {
                matrix[y][x] = 3; // Մատրիցի 5 տոկոսը կլինի 3
            }
            else if (a >= 95 && a < 98) {
                matrix[y][x] = 4; // Մատրիցի 3 տոկոսը կլինի 4
            }
            else if (a >= 98 && a < 100) {
                matrix[y][x] = 6; // Մատրիցի 2 տոկոսը կլինի 6
            }
        }
    }
}

MatrixGenerator(25, 25)

//----

io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = [];
predatorArr = [];
stoneMakerArr = [];
stoneArr = [];
manArr = [];
iceManArr = [];
iceArr = [];

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
StoneMaker = require("./StoneMaker")
Stone = require("./Stone")
Man = require("./Man")
IceMan = require("./IceMan")
Ice = require("./Ice")

//----

function createObject(matrix){
    
    //pttvum em matrix mejov u stexcum em object 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
                
            }
            else if (matrix[y][x] == 3) {
                var ete = new Predator(x,y,3);
                predatorArr.push(ete);
                
            }
            else if (matrix[y][x] == 4) {
                var se = new StoneMaker(x,y,4);
                stoneMakerArr.push(se);
                
            }
            else if (matrix[y][x] == 5) {
                var st = new Stone(x,y,5);
                stoneArr.push(st);
                
            }
            else if (matrix[y][x] == 6) {
                var mani = new Man(x,y,6);
                manArr.push(mani);
                
            }
            else if (matrix[y][x] == 7) {
                var im = new IceMan(x,y,7);
                iceManArr.push(im);
                
            }
            else if (matrix[y][x] == 8) {
                var i = new Ice(x,y,8);
                iceArr.push(i);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
     for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();        
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();        
    }
    for (var i in stoneMakerArr) {
        stoneMakerArr[i].move();
        stoneMakerArr[i].eat(); 
        stoneMakerArr[i].mul();  
    }
    for (var i in manArr) {
        manArr[i].move();
        manArr[i].eat(); 
        manArr[i].mul();
    }
    for (var i in iceManArr) {
        iceManArr[i].move();
        iceManArr[i].eat(); 
        iceManArr[i].mul();  
    }
    io.sockets.emit('send matrix', matrix)
}

function addEnergy(){
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if(matrix[y][x] == 2){
        grassEaterArr.energy += 1;
    }
    if(matrix[y][x] == 3){
        predatorArr.energy += 1;
    }
    io.sockets.emit('send matrix', matrix);
}

function removeEnergy(){
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if(matrix[y][x] == 2){
        grassEaterArr.energy -= 1;
    }
    if(matrix[y][x] == 3){
        predatorArr.energy -= 1;
    }
    io.sockets.emit('send matrix', matrix);
}

setInterval(game, 1000)

io.on('connection', function(socket){
    createObject(matrix);
    socket.on("add Energy", addEnergy);
    socket.on("remove Energy", removeEnergy);
})

var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.stoneMaker = stoneMakerArr.length;
    statistics.stone = stoneArr.length;
    statistics.man = manArr.length;
    statistics.iceMan = iceManArr.length;
    statistics.ice = iceArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){})
},1000)

