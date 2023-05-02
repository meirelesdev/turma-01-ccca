import { EnrollmentStudentInputDTO } from "./EnrollmentStudentDTO";
import EnrollStudentUsecase from "./EnrollStudentUsecase";
import RepositoryMemoryFactory from "./RepositoryMemoryFactory";
import GetEnrollmentUsecase from "./GetEnrollmentUsecase";
import PayInvoiceUsecase from "./PayInvoiceUsecase";
import { PayInvoiceInputDTO } from "./PayInvoiceDTO";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollment: GetEnrollmentUsecase;
let payInvoice: PayInvoiceUsecase;
let year: number;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
  getEnrollment = new GetEnrollmentUsecase(repositoryMemoryFactory);
  payInvoice = new PayInvoiceUsecase(repositoryMemoryFactory);
  const currentDate = new Date();
  year = currentDate.getFullYear();
});

test("Deve pagar uma fatura", () => {
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
  const input = new PayInvoiceInputDTO({
    code: `${year}EM1A0001`,
    month: 8,
    year,
    amount: 1416.66,
    paymentDate: new Date(`${year}-06-20`),
  });

  payInvoice.execute(input);
  const enrollmentOutput = getEnrollment.execute(`${year}EM1A0001`, new Date(`${year}-06-20`));

  expect(enrollmentOutput.code).toBe(`${year}EM1A0001`);
  expect(enrollmentOutput.invoices[7].balance).toBe(0);
});

test("Deve pagar uma fatura vencida", () => {
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

  const input = new PayInvoiceInputDTO({
    code: enrollment.code,
    month: 1,
    year: year,
    amount: 3895.82,
    paymentDate: new Date(`${year}-06-20`),
  });
  payInvoice.execute(input);
  const enrollmentOutput = getEnrollment.execute(input.code, new Date(`${year}-06-20`));
  expect(enrollmentOutput.code).toBe(input.code);

  expect(enrollmentOutput.invoices[0].balance).toBe(0);
});
