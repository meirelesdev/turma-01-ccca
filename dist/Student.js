"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Name_1 = __importDefault(require("./Name"));
const Cpf_1 = __importDefault(require("./Cpf"));
class Student {
    constructor(name, cpf) {
        this.name = new Name_1.default(name);
        this.cpf = new Cpf_1.default(cpf);
    }
}
exports.default = Student;
