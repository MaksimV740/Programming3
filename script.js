var socket = io();

var side = 20;

function setup() {
    createCanvas(25 * side, 25 * side);
    background('#acacac'); 
}

function random(a, b){
    return Math.floor(Math.random() * b)
}
//nerkuma
function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (winter) {
                var a = Math.floor(random() * 10);
                if (a % 2 == 0) fill("green");
                else fill("#00F5B8")
            }
            else {
                fill("green");
            }
            rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                if (winter) {
                var a = Math.floor(random() * 10);
                if (a % 2 == 0) fill("lightblue");
                else fill("darkblue")
            }
                else {
                    fill("#9664fa");
                }
                rect(x * side, y * side, side, side);
                }
            else if (matrix[y][x] == 8) {
                fill("white");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

setInterval(
    function() {
        socket.on('send matrix', nkarel)
    },100
)
function winterCall() {
    document.getElementById("myBody").style.backgroundColor = "lightblue";
    winter = true;
}

function summer() {
    document.getElementById("myBody").style.backgroundColor = "#ffef3b";
    winter = false;
}

function addEnergy(){
    socket.emit("add Energy")
}

function removeEnergy(){
    socket.emit("remove Energy")
}