import EnrollmentRepository from "./EnrollmentRepository";
import RepositoryAbastractFactory from "./RepositoryAbastractFactory";

export default class GetEnrollUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string): any {
    const enrollment = this.enrollmentRepository.get(code);
    const balance = enrollment?.getInvoiceBalance();
    return {
      code: enrollment?.code.value,
      balance,
    };
  }
}
