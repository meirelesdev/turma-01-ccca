import RepositoryMemoryFactory from "../../adapter/factory/memory/RepositoryMemoryFactory";
import EnrollStudentUsecase from "../../domain/usecase/EnrollStudentUsecase";
import GetEnrollmentsUsecase from "../../domain/usecase/GetEnrollmentsUsecase";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollmentsUsecase: GetEnrollmentsUsecase;
let year: number;

describe("Get Enrollments Test", function () {
  beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
    getEnrollmentsUsecase = new GetEnrollmentsUsecase(repositoryMemoryFactory);
    const currentDate = new Date();
    year = currentDate.getFullYear();
  });

  test("Deve pegar uma matricula com saldo da fatura", async () => {
    const enrollmentRequest = {
      studentName: "Ana Maria",
      studentCpf: "297.788.214-61",
      studentBirthDate: "2002-03-12",
      level: "EM",
      module: "1",
      classroom: "A",
      installments: 12,
    };
    await enrollStudentUsecase.execute(enrollmentRequest);
    const enrollmentsOutput = await getEnrollmentsUsecase.execute(new Date());
    expect(enrollmentsOutput.length).toBe(1);
  });
});
