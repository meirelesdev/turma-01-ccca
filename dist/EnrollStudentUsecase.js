"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(require("./Student"));
class EnrollStudentUsecase {
    constructor() {
        this.enrollments = [];
    }
    execute(input) {
        const student = new Student_1.default(input.student.name, input.student.cpf);
        const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === input.student.cpf);
        if (existingEnrollment)
            throw new Error("Enrollment with duplicated student is not allowed");
        const enrollment = {
            student
        };
        this.enrollments.push(enrollment);
        return enrollment;
    }
}
exports.default = EnrollStudentUsecase;
