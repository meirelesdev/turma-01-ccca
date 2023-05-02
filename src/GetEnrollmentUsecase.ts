import EnrollmentRepository from "./EnrollmentRepository";
import { GetEnrollmentOutputDTO } from "./GetEnrollmentDTO";
import RepositoryAbastractFactory from "./RepositoryAbastractFactory";

export default class GetEnrollUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string, currentDate: Date): GetEnrollmentOutputDTO {
    const enrollment = this.enrollmentRepository.get(code);
    if (!enrollment) throw new Error(`Enrollment not found`);
    const balance = enrollment.getInvoiceBalance();
    const output = new GetEnrollmentOutputDTO({
      code: enrollment.code.value,
      balance,
      status: enrollment.status,
      invoices: [],
    });
    for (const invoice of enrollment.invoices) {
      output.invoices.push({
        amount: invoice.amount,
        status: invoice.getStatus(currentDate),
        dueDate: invoice.dueDate,
        penalty: invoice.getPenalty(currentDate),
        interests: invoice.getInterests(currentDate),
        balance: invoice.getBalance(),
      });
    }
    return output;
  }
}
