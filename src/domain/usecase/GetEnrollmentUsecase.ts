import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { GetEnrollmentOutputDTO } from "./DTO/GetEnrollmentDTO";
import { InvoiceOutputDTO } from "./DTO/PayInvoiceDTO";

export default class GetEnrollmentUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  async execute(code: string, currentDate: Date): Promise<GetEnrollmentOutputDTO> {
    const enrollment = await this.enrollmentRepository.get(code);
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
