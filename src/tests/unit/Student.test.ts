import Student from "../../domain/entity/Student";

describe("Student tests", function () {
  test("Não deve criar estudante com nome invalido", async () => {
    const studentData = {
      name: "Ana",
      cpf: "864.464.227-84",
      birthDate: "2002-03-12",
    };
    expect(() => new Student(studentData)).toThrow(new Error("Invalid student name"));
  });

  test("Não deve criar estudante com cpf invalido", async () => {
    const studentData = {
      name: "Ana Maria",
      cpf: "123.456.789-99",
      birthDate: "2002-03-12",
    };
    expect(() => new Student(studentData)).toThrow(new Error("Invalid cpf"));
  });

  test("Deve criar estudante", async () => {
    const studentData = {
      name: "Ana Maria",
      cpf: "864.464.227-84",
      birthDate: "2002-03-12",
    };
    const student = new Student(studentData);
    expect(student.name.value).toBe(studentData.name);
    expect(student.cpf.value).toBe(studentData.cpf);
    expect(student.birthDate).toBeInstanceOf(Date);
    expect(student.birthDate.toISOString()).toBe(
      new Date("2002-03-12T00:00:00.000Z").toISOString()
    );
  });

  test("Deve Testar a idade do estudante", async () => {
    const studentData = {
      name: "Ana Maria",
      cpf: "864.464.227-84",
      birthDate: "2002-03-12",
    };
    const expectedAge = new Date().getFullYear() - new Date(studentData.birthDate).getFullYear();
    const student = new Student(studentData);
    expect(student.getAge()).toBe(expectedAge);
  });
});
