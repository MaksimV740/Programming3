var Helper = require("./Helper");

module.exports = class IceMan extends Helper {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 0;
    }
    //vorpes method
    getNewCoordinates() {
        super.getNewCoordinates();
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.y = newY;
            this.x = newX;
        }
    }

    eat() {
        var newCell1 = this.chooseCell(2);
        var newCell2 = this.chooseCell(3);
        var newCell3 = this.chooseCell(6);
        var newCell = random(newCell1.concat(newCell2.concat(newCell3)));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            for (var i in manArr) {
                if (newX == manArr[i].x && newY == manArr[i].y) {
                    manArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy++;

        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 1 && newCell) {
            var newStone = new Stone(newCell[0], newCell[1], this.index);
            stoneArr.push(newStone);
            matrix[newCell[1]][newCell[0]] = 8;
            this.energy = 0;
        }
    }
}