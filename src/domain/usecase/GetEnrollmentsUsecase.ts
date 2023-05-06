import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { GetEnrollmentOutputDTO } from "./DTO/GetEnrollmentDTO";
import { InvoiceOutputDTO } from "./DTO/PayInvoiceDTO";

export default class GetEnrollmentsUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  async execute(currentDate: Date): Promise<GetEnrollmentOutputDTO[]> {
    const enrollments = await this.enrollmentRepository.getAll();
    const output = [];

    for (const enrollment of enrollments) {
      const balance = enrollment.getInvoiceBalance();
      const outputData: GetEnrollmentOutputDTO = {
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
        outputData.invoices.push(invoiceData);
      }
      output.push(outputData);
    }
    return output;
  }
}
