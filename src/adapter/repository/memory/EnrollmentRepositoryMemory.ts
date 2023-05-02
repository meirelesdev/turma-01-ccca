import Enrollment from "../../../domain/entity/Enrollment";
import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
  enrollments: Enrollment[];
  constructor() {
    this.enrollments = [];
  }
  get(code: string): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.find((enrollment) => enrollment.code.value === code);
    return Promise.resolve(enrollment);
  }
  async save(enrollment: Enrollment): Promise<void> {
    Promise.resolve(this.enrollments.push(enrollment));
  }
  findAllByClass(level: string, module: string, classroom: string): Promise<Enrollment[]> {
    const enrollments = this.enrollments.filter(
      (enrollment) =>
        enrollment.level.code === level &&
        enrollment.module.code === module &&
        enrollment.classroom.code === classroom
    );
    return Promise.resolve(enrollments);
  }
  getByCpf(value: string): Promise<Enrollment | undefined> {
    const enrollemnt = this.enrollments.find(
      (enrollment) => enrollment.student.cpf.value === value
    );
    return Promise.resolve(enrollemnt);
  }
  count(): Promise<number> {
    return Promise.resolve(this.enrollments.length);
  }
}
