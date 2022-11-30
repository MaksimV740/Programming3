var Helper = require("./Helper");

module.exports = class Stone extends Helper{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 0;
    }

    getNewCoordinates() {
        super.getNewCoordinates();
    }
}