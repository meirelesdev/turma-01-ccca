import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import { PayInvoiceInputDTO } from "./DTO/PayInvoiceDTO";

export default class PayInvoiceUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  async execute(input: PayInvoiceInputDTO): Promise<void> {
    const enrollment = await this.enrollmentRepository.get(input.code);
    if (!enrollment) throw new Error(`Enrollment not found`);
    enrollment.payInvoice(input.month, input.year, input.amount, input.paymentDate);
  }
}
