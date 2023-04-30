import { EnrollmentStudentInputDTO } from "./EnrollmentStudentDTO";
import EnrollStudentUsecase from "./EnrollStudentUsecase";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import GetEnrollmentUsecase from "./GetEnrollmentUsecase";
import PayInvoiceUsecase from "./PayInvoiceUsecase";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollment: GetEnrollmentUsecase;
let payInvoice: PayInvoiceUsecase;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
  getEnrollment = new GetEnrollmentUsecase(repositoryMemoryFactory);
  payInvoice = new PayInvoiceUsecase(repositoryMemoryFactory);
});

test.only("Deve pagar uma fatura", () => {
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
  const data = new Date();
  const year = data.getFullYear();
  payInvoice.execute(`${year}EM1A0001`, 1, year, 1416.66);
  const getEnrollmentOutput = getEnrollment.execute(`${year}EM1A0001`);
  expect(getEnrollmentOutput.code).toBe(`${year}EM1A0001`);
  expect(getEnrollmentOutput.balance).toBe(15583.33);
});
