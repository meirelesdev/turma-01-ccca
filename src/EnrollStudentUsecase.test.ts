import EnrollStudentUsecase from "./EnrollStudentUsecase";

test("Não deve matricular sem um nome de estudante válido", async function () {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: 'Ana'
    }
  }
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
});

test("Não deve matricular sem um cpf de estudante válido", async function () {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '123.456.789-99'
    }
  }
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"))
});

test("Não deve matricular um aluno duplicado", () => {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84"
    }
  };
  enrollStudentUsecase.execute(enrollmentRequest);
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
})

test("Deve gerar o código de matrícula", () => {

})