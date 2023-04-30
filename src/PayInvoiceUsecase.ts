import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbastractFactory from "./RepositoryAbastractFactory";

export default class PayInvoiceUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string, month: number, year: number, amount: number): void {
    const enrollment = this.enrollmentRepository.get(code);
    if (!enrollment) throw new Error(`Enrollment not found: ${code}`);
    enrollment.payInvoice(month, year, amount);
  }
}
