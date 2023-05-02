import RepositoryMemoryFactory from "../repository/repositoryMemory/RepositoryMemoryFactory";
import EnrollStudentUsecase from "./EnrollStudentUsecase";
import GetEnrollmentUsecase from "./GetEnrollmentUsecase";

let enrollStudentUsecase: EnrollStudentUsecase;
let getEnrollment: GetEnrollmentUsecase;
let year: number;

beforeEach(() => {
  const repositoryMemoryFactory = new RepositoryMemoryFactory();
  enrollStudentUsecase = new EnrollStudentUsecase(repositoryMemoryFactory);
  getEnrollment = new GetEnrollmentUsecase(repositoryMemoryFactory);
  const currentDate = new Date();
  year = currentDate.getFullYear();
});

test("Deve pegar uma matricula com saldo da fatura", () => {
  const enrollmentRequest = {
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  };
  enrollStudentUsecase.execute(enrollmentRequest);
  const enrollmentOutput = getEnrollment.execute(`${year}EM1A0001`, new Date(`${year}-06-20`));
  expect(enrollmentOutput.code).toBe(`${year}EM1A0001`);
  expect(enrollmentOutput.balance).toBe(16999.99);
  expect(enrollmentOutput.status).toBe("active");
});

test("Deve calcular a data de vencimento e o status de retorno aberto ou vencido para cada fatura", () => {
  const enrollmentRequest = {
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  };
  enrollStudentUsecase.execute(enrollmentRequest);

  const enrollmentOutput = getEnrollment.execute(`${year}EM1A0001`, new Date(`${year}-06-20`));

  expect(enrollmentOutput.code).toBe(`${year}EM1A0001`);
  expect(enrollmentOutput.status).toBe("active");
  expect(enrollmentOutput.invoices[0].dueDate.toISOString()).toBe(`${year}-01-05T03:00:00.000Z`);
  expect(enrollmentOutput.invoices[0].status).toBe(`overdue`);

  expect(enrollmentOutput.invoices[11].dueDate.toISOString()).toBe(`${year}-12-05T03:00:00.000Z`);
  expect(enrollmentOutput.invoices[11].status).toBe(`open`);
});

test("Deve calcular multa e juros", () => {
  const enrollmentRequest = {
    studentName: "Ana Maria",
    studentCpf: "297.788.214-61",
    studentBirthDate: "2002-03-12",
    level: "EM",
    module: "1",
    classroom: "A",
    installments: 12,
  };
  enrollStudentUsecase.execute(enrollmentRequest);
  const enrollmentOutput = getEnrollment.execute(`${year}EM1A0001`, new Date(`${year}-06-20`));

  expect(enrollmentOutput.code).toBe(`${year}EM1A0001`);
  expect(enrollmentOutput.status).toBe("active");

  expect(enrollmentOutput.invoices[0].penalty).toBe(141.67);
  expect(enrollmentOutput.invoices[0].interests).toBe(2337.49);

  expect(enrollmentOutput.invoices[11].penalty).toBe(0);
  expect(enrollmentOutput.invoices[11].interests).toBe(0);
});
