import RepositoryMemoryFactory from "../../adapter/factory/memory/RepositoryMemoryFactory";
import EnrollStudentUsecase from "../../domain/usecase/EnrollStudentUsecase";

let enrollStudentUsecase: EnrollStudentUsecase;
let year: number;

describe("Enroll Student Test", function () {
  beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
    const currentDate = new Date();
    year = currentDate.getFullYear();
  });

  test("Não deve matricular sem um nome de estudante válido", async () => {
    const enrollmentRequest = {
      studentName: "Ana",
      studentCpf: "123.456.789-99",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };
    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Invalid student name")
    );
  });

  test("Não deve matricular sem um cpf de estudante válido", async () => {
    const enrollmentRequest = {
      studentName: "Ana Silva",
      studentCpf: "123.456.789-99",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };
    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Invalid cpf")
    );
  });

  test("Não deve matricular um aluno duplicado", async () => {
    const enrollmentRequest = {
      studentName: "Ana Maria",
      studentCpf: "864.464.227-84",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };
    await enrollStudentUsecase.execute(enrollmentRequest);
    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Enrollment with duplicated student is not allowed")
    );
  });

  test("Deve gerar o código de matrícula", async () => {
    const enrollmentRequest = {
      studentName: "Maria Carolina Fonseca",
      studentCpf: "755.525.774-26",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };
    const enrollment = await enrollStudentUsecase.execute(enrollmentRequest);

    expect(enrollment.code).toBe(`${year}EM1A0001`);
  });

  test("Não deve matricular aluno abaixo da idade minima", async () => {
    const enrollmentRequest = {
      studentName: "Maria Carolina Fonseca",
      studentCpf: "755.525.774-26",
      studentBirthDate: "2014-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };

    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Student below minimum age")
    );
  });

  test("Não deve matricular aluno fora da capacidade da turma", async () => {
    const enrollmentRequestArray = [
      {
        studentName: "Maria Carolina Maia",
        studentCpf: "755.525.774-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "1",
        classroom: "A",
        installments: 12,
      },
      {
        studentName: "Maria Carolina Fonseca",
        studentCpf: "814.311.585-26",
        studentBirthDate: "2002-03-12",
        level: "EM",
        module: "1",
        classroom: "A",
        installments: 12,
      },
    ];

    for (const enrollmentReq of enrollmentRequestArray) {
      await enrollStudentUsecase.execute(enrollmentReq);
    }

    const enrollmentRequest = {
      studentName: "Maria Carolina Pra falhar",
      studentCpf: "297.788.214-61",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };

    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Class is over capacity")
    );
  });

  test("Não deve matricular aluno apos o termino da turma", async () => {
    const enrollmentRequest = {
      studentName: "Ana Maria",
      studentCpf: "297.788.214-61",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "B",
      installments: 12,
    };

    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Class is already finished")
    );
  });

  test("Não deve matricular aluno apos 25% do inicio da turma", async () => {
    const enrollmentRequest = {
      studentName: "Ana Maria",
      studentCpf: "297.788.214-61",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "C",
      installments: 12,
    };

    await expect(() => enrollStudentUsecase.execute(enrollmentRequest)).rejects.toThrow(
      new Error("Class is already started")
    );
  });

  test("Deve gerar faturas", async () => {
    const enrollmentRequest = {
      studentName: "Ana Maria",
      studentCpf: "297.788.214-61",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };
    const enrollment = await enrollStudentUsecase.execute(enrollmentRequest);

    expect(enrollment.invoices).toHaveLength(12);
    expect(enrollment.invoices[0].amount).toBe(1416.66);
    expect(enrollment.invoices[11].amount).toBe(1416.73);
  });
});
