class Helper {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.index = index;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

}

class Grass extends Helper{
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    //yntruma shrjaka 8 vandakner
    chooseCell(character) {
        return super.chooseCell(character);
    }

    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        // console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

class GrassEater extends Helper {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 12;
    }
    //vorpes method
    getNewCoordinates() {
        super.getNewCoordinates();
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    //qayluma
    move() {

        //yntruma vandak
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }

    eat() {
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 10 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

class Predator extends Helper {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 16;
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
            this.energy-=2;

        }

    }

    eat() {
        var newCell = random(this.chooseCell(2));

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


            this.y = newY;
            this.x = newX;
            this.energy += 6;

        }
    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            var newpredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newpredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 12;
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

class StoneMaker extends Helper{
    constructor(x, y, index) {
        super(x, y, index);
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
        var newCell = random(newCell1.concat(newCell2));

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
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 0;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

class Stone extends Helper{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 0;
    }

    getNewCoordinates() {
        super.getNewCoordinates();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

class Man extends Helper{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 0;
    }
    getNewCoordinates() {
        super.getNewCoordinates();
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var newCell = random(this.chooseCell(Math.round(random(1))));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (newCell) {
                matrix[this.y][this.x] = 1;
                var newGrass = new Grass(this.x, this.y, 1);
                grassArr.push(newGrass);
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
        }
    }

    eat() {


        var newCell = random(this.chooseCell(5));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in stoneArr) {
                if (newX == stoneArr[i].x && newY == stoneArr[i].y) {
                    stoneArr.splice(i, 1);
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

        if (this.energy >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.energy = 0;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
