import EnrollStudentUsecase from "../../domain/usecase/EnrollStudentUsecase";
import GetEnrollmentUsecase from "../../domain/usecase/GetEnrollmentUsecase";
import CancellEnrollmentUsecase from "../../domain/usecase/CancellEnrollmentUsecase";
import RepositoryMemoryFactory from "../../adapter/factory/memory/RepositoryMemoryFactory";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollment: GetEnrollmentUsecase;
let cancellEnrollmentUsecase: CancellEnrollmentUsecase;
let year: number;

describe("Cancel Enrollment Test", function () {
  beforeEach(() => {
    const repositoryMemoryFactory = new RepositoryMemoryFactory();
    enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
    getEnrollment = new GetEnrollmentUsecase(repositoryMemoryFactory);
    cancellEnrollmentUsecase = new CancellEnrollmentUsecase(repositoryMemoryFactory);
    const currentDate = new Date();
    year = currentDate.getFullYear();
  });

  test("Deve cancelar uma matricula", async () => {
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
    await cancellEnrollmentUsecase.execute(`${year}EM1A0001`);
    const enrollmentOutput = await getEnrollment.execute(
      `${year}EM1A0001`,
      new Date(`${year}-06-20`)
    );

    expect(enrollmentOutput.status).toBe("cancelled");
  });
});
