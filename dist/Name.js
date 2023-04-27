"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Name {
    constructor(value) {
        const result = /^([A-Za-z]+ )+([A-Za-z])+$/.test(value);
        if (!result)
            throw new Error("Invalid student name");
        this.value = value;
    }
}
exports.default = Name;
