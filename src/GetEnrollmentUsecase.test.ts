import { EnrollmentStudentInputDTO } from "./EnrollmentStudentDTO";
import EnrollStudentUsecase from "./EnrollStudentUsecase";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import GetEnrollmentUsecase from "./GetEnrollmentUsecase";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollment: GetEnrollmentUsecase;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
  getEnrollment = new GetEnrollmentUsecase(repositoryMemoryFactory);
});

test("Deve pegar uma matricula com saldo da fatura", () => {
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
  const year = new Date().getFullYear();
  const getEnrollmentOutput = getEnrollment.execute(`${year}EM1A0001`);
  expect(getEnrollmentOutput.code).toBe(`${year}EM1A0001`);
  expect(getEnrollmentOutput.balance).toBe(16999.99);
});
