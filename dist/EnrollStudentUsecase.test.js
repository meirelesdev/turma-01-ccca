"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnrollStudentUsecase_1 = __importDefault(require("./EnrollStudentUsecase"));
test("Não deve matricular sem um nome de estudante válido", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const enrollStudentUsecase = new EnrollStudentUsecase_1.default();
        const enrollmentRequest = {
            student: {
                name: 'Ana'
            }
        };
        expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"));
    });
});
test("Não deve matricular sem um cpf de estudante válido", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const enrollStudentUsecase = new EnrollStudentUsecase_1.default();
        const enrollmentRequest = {
            student: {
                name: 'Ana Silva',
                cpf: '123.456.789-99'
            }
        };
        expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"));
    });
});
test("Não deve matricular um aluno duplicado", () => {
    const enrollStudentUsecase = new EnrollStudentUsecase_1.default();
    const enrollmentRequest = {
        student: {
            name: "Ana Maria",
            cpf: "864.464.227-84"
        }
    };
    enrollStudentUsecase.execute(enrollmentRequest);
    expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
});
