import EnrollmentRepository from "./EnrollmentRepository";
import { PayInvoiceInputDTO } from "./PayInvoiceDTO";
import RepositoryAbastractFactory from "./RepositoryAbastractFactory";

export default class PayInvoiceUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(input: PayInvoiceInputDTO): void {
    const enrollment = this.enrollmentRepository.get(input.code);
    if (!enrollment) throw new Error(`Enrollment not found`);
    enrollment.payInvoice(input.month, input.year, input.amount, input.paymentDate);
  }
}
