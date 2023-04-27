import EnrollStudentUsecase from "./EnrollStudentUsecase";

test("Não deve matricular sem um nome de estudante válido", async function () {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: 'Ana'
    },
    level: "EM",
    module: "1",
    class: "A"
  }
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
});

test("Não deve matricular sem um cpf de estudante válido", async function () {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '123.456.789-99'
    },
    level: "EM",
    module: "1",
    class: "A"
  }
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"))
});

test("Não deve matricular um aluno duplicado", () => {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: "Ana Maria",
      cpf: "864.464.227-84"
    },
    level: "EM",
    module: "1",
    class: "A"
  };
  enrollStudentUsecase.execute(enrollmentRequest);
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
})

test("Deve gerar o código de matrícula", () => {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
    },
    level: "EM",
    module: "1",
    class: "A"
  }
  const enrollment = enrollStudentUsecase.execute(enrollmentRequest)

  expect(enrollment.code).toBe(`${new Date().getFullYear()}EM1A0001`);
})

test("Não deve matricular aluno abaixo da idade minima", () => {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Fonseca",
      cpf: "755.525.774-26",
      birthDate: "2014-03-12"
    },
    level: "EM",
    module: "1",
    class: "A"
  }

  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Student below minimum age"));
})

test("Não deve matricular aluno fora da capacidade da turma", () => {
  const enrollStudentUsecase = new EnrollStudentUsecase();
  const enrollmentRequestArray = [
    {
      student: {
        name: "Maria Carolina Maia",
        cpf: "755.525.774-26",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    }, {
      student: {
        name: "Maria Carolina Fonseca",
        cpf: "814.311.585-26",
        birthDate: "2002-03-12"
      },
      level: "EM",
      module: "1",
      class: "A"
    }]

  for (const enrollmentReq of enrollmentRequestArray) {
    enrollStudentUsecase.execute(enrollmentReq)
  }

  const enrollmentRequest = {
    student: {
      name: "Maria Carolina Pra falhar",
      cpf: "297.788.214-61",
      birthDate: "2002-03-12"
    },
    level: "EM",
    module: "1",
    class: "A"
  }
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"));
})