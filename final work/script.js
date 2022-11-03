let matrix = [];
let rows = 25;
let columns = 25;

for (let y = 0; y < rows; y++) {
    matrix[y] = [];
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 45 && a < 80) {
            matrix[y][x] = 1;
        }
        if (a > 0 && a< 45) {
            matrix[y][x] = 0;
        }
        else if (a >= 80 && a < 85) {
            matrix[y][x] = 2;
        }
        else if (a > 86 && a < 92) {
            matrix[y][x] = 4;
        }
        else if (a >= 92 && a < 94) {
            matrix[y][x] = 3;
        }
        else if (a > 95 && a <100){
            matrix[y][x] = 5;
        }
        
    }
}

var side = 20;

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var stoneArr = [];
var manArr = [];

function setup() {

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var me = new Man(x,y,4);
                manArr.push(me);
            }
            else if (matrix[y][x] == 5){
                var st = new Stone(x,y,5);
                stoneArr.push(st);
            }

        }
    }

}

function draw() {



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }

    if(predatorArr.length < 4){
        var pr = new Predator(1,1,3);
        var pr1 = new Predator(23,23,3);
        predatorArr.push(pr);
        predatorArr.push(pr1)
        matrix[1][1] = 3;
        matrix[23][23] = 3;
    }else if(grassEaterArr.length == 0){
        var gr = new GrassEater(24,24,2);
        grassEaterArr.push(gr);
        matrix[24][24] = 2;   
    }

    for (var i in grassArr) {
        try {
            grassArr[i].mul()
        } catch (err) {
            continue;
        }
    }
    for (var i in grassEaterArr) {
        try { grassEaterArr[i].eat() } catch (err) { continue };
        try { grassEaterArr[i].mul() } catch (err) { continue };
    }
    for (var i in predatorArr) {
        try { predatorArr[i].eat() } catch (err) { continue };
        try { predatorArr[i].mul(); } catch (err) { continue };
    }
    for (var i in manArr) {
        try { manArr[i].eat() } catch (err) { continue };
    }

}
