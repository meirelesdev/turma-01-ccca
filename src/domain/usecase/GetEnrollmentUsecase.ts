import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { GetEnrollmentOutputDTO } from "./DTO/GetEnrollmentDTO";
import { InvoiceOutputDTO } from "./DTO/PayInvoiceDTO";

export default class GetEnrollUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string, currentDate: Date): GetEnrollmentOutputDTO {
    const enrollment = this.enrollmentRepository.get(code);
    if (!enrollment) throw new Error(`Enrollment not found`);
    const balance = enrollment.getInvoiceBalance();
    const output: GetEnrollmentOutputDTO = {
      code: enrollment.code.value,
      balance,
      status: enrollment.status,
      invoices: [],
    };
    for (const invoice of enrollment.invoices) {
      const invoiceData: InvoiceOutputDTO = {
        amount: invoice.amount,
        status: invoice.getStatus(currentDate),
        dueDate: invoice.dueDate,
        penalty: invoice.getPenalty(currentDate),
        interests: invoice.getInterests(currentDate),
        balance: invoice.getBalance(),
      };
      output.invoices.push(invoiceData);
    }
    return output;
  }
}
