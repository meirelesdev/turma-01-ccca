import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { GetEnrollmentsOutputDTO } from "./DTO/GetEnrollmentsDTO";
import { InvoiceOutputDTO } from "./DTO/PayInvoiceDTO";

export default class GetEnrollmentsUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  async execute(currentDate: Date): Promise<GetEnrollmentsOutputDTO[]> {
    const enrollments = await this.enrollmentRepository.getAll();
    const output = [];

    for (const enrollment of enrollments) {
      const balance = enrollment.getInvoiceBalance();
      const outputData: GetEnrollmentsOutputDTO = {
        code: enrollment.code.value,
        balance,
        studentName: enrollment.student.name.value,
        studentBirthDate: enrollment.student.birthDate.toISOString(),
        studentCpf: enrollment.student.cpf.value,
        levelDescription: enrollment.level.description,
        moduleDescription: enrollment.module.description,
        classroomCode: enrollment.classroom.code,
        status: enrollment.status,
        invoices: [],
      };
      for (const invoice of enrollment.invoices) {
        const invoiceData = {
          month: invoice.month,
          year: invoice.year,
          amount: invoice.amount,
          status: invoice.getStatus(currentDate),
          dueDate: invoice.dueDate,
          penalty: invoice.getPenalty(currentDate),
          interests: invoice.getInterests(currentDate),
          balance: invoice.getBalance(),
        };
        outputData.invoices.push(invoiceData);
      }
      output.push(outputData);
    }
    return output;
  }
}
