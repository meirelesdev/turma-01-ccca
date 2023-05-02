import { EnrollmentStudentInputDTO } from "./EnrollmentStudentDTO";
import EnrollStudentUsecase from "./EnrollStudentUsecase";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import GetEnrollmentUsecase from "./GetEnrollmentUsecase";
import CancellEnrollmentUsecase from "./CancellEnrollmentUsecase";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollment: GetEnrollmentUsecase;
let cancellEnrollmentUsecase: CancellEnrollmentUsecase;
let year: number;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
  getEnrollment = new GetEnrollmentUsecase(repositoryMemoryFactory);
  cancellEnrollmentUsecase = new CancellEnrollmentUsecase(repositoryMemoryFactory);
  const currentDate = new Date();
  year = currentDate.getFullYear();
});

test("Deve cancelar uma matricula", () => {
  const enrollmentRequest = new EnrollmentStudentInputDTO({
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  });
  enrollStudentUsecase.execute(enrollmentRequest);
  cancellEnrollmentUsecase.execute(`${year}EM1A0001`);
  const enrollmentOutput = getEnrollment.execute(`${year}EM1A0001`, new Date(`${year}-06-20`));

  expect(enrollmentOutput.status).toBe("cancelled");
});
