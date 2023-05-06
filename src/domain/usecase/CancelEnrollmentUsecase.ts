import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import EnrollmentRepository from "../repository/EnrollmentRepository";

export default class CancelEnrollmentUsecase {
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  async execute(code: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.get(code);
    if (!enrollment) throw new Error(`Enrollment not found`);
    enrollment.status = "cancelled";
    await this.enrollmentRepository.update(enrollment);
  }
}
