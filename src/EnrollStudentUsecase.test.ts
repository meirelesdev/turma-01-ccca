import { EnrollmentStudentInputDTO } from "./EnrollmentStudentDTO";
import EnrollStudentUsecase from "./EnrollStudentUsecase";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";

let enrollStudentUsecase: EnrollStudentUsecase;

beforeEach(() => {
  enrollStudentUsecase = new EnrollStudentUsecase(new RepositoryMemoryFactory());
});

test("Não deve matricular sem um nome de estudante válido", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana",
    studentCpf: "123.456.789-99",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(
    new Error("Invalid student name")
  );
});

test("Não deve matricular sem um cpf de estudante válido", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana Silva",
    studentCpf: "123.456.789-99",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(new Error("Invalid cpf"));
});

test("Não deve matricular um aluno duplicado", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana Maria",
    studentCpf: "864.464.227-84",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });
  enrollStudentUsecase.execute(enrollmentRequest);
  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(
    new Error("Enrollment with duplicated student is not allowed")
  );
});

test("Deve gerar o código de matrícula", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Maria Carolina Fonseca",
    studentCpf: "755.525.774-26",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });
  const enrollment = enrollStudentUsecase.execute(enrollmentRequest);

  expect(enrollment.code).toBe(`${new Date().getFullYear()}EM1A0001`);
});

test("Não deve matricular aluno abaixo da idade minima", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Maria Carolina Fonseca",
    studentCpf: "755.525.774-26",
    studentBirthDate: "2014-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });

  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(
    new Error("Student below minimum age")
  );
});

test("Não deve matricular aluno fora da capacidade da turma", () => {
  const enrollmentRequestArray = [
    new EnrollmentStudentInputDTO({
      studentName: "Maria Carolina Maia",
      studentCpf: "755.525.774-26",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    }),
    new EnrollmentStudentInputDTO({
      studentName: "Maria Carolina Fonseca",
      studentCpf: "814.311.585-26",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    }),
  ];

  for (const enrollmentReq of enrollmentRequestArray) {
    enrollStudentUsecase.execute(enrollmentReq);
  }

  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Maria Carolina Pra falhar",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });

  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(
    new Error("Class is over capacity")
  );
});

test("Não deve matricular aluno apos o termino da turma", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "B",
    installments: 12,
  });

  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(
    new Error("Class is already finished")
  );
});

test("Não deve matricular aluno apos 25% do inicio da turma", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "C",
    installments: 12,
  });

  expect(() => enrollStudentUsecase.execute(enrollmentRequest)).toThrow(
    new Error("Class is already started")
  );
});

test("Deve gerar faturas", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });
  const enrollment = enrollStudentUsecase.execute(enrollmentRequest);

  expect(enrollment.invoices).toHaveLength(12);
  expect(enrollment.invoices[0].amount).toBe(1416.66);
  expect(enrollment.invoices[11].amount).toBe(1416.73);
});
