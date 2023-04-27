"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class circle {
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return 2 * Math.PI * this.radius;
    }
}
exports.default = circle;
