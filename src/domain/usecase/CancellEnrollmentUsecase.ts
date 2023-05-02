import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";

export default class CancellEnrollmentUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string): void {
    const enrollment = this.enrollmentRepository.get(code);
    if (!enrollment) throw new Error(`Enrollment not found`);
    enrollment.status = "cancelled";
  }
}
