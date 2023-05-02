import Enrollment from "../../entity/Enrollment";
import EnrollmentRepository from "../EnrollmentRepository";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
  enrollments: Enrollment[];
  constructor() {
    this.enrollments = [];
  }
  get(code: string): Enrollment | undefined {
    const enrollment = this.enrollments.find((enrollment) => enrollment.code.value === code);
    return enrollment;
  }
  save(enrollment: Enrollment): void {
    this.enrollments.push(enrollment);
  }
  findAllByClass(level: string, module: string, classroom: string): Enrollment[] {
    return this.enrollments.filter(
      (enrollment) =>
        enrollment.level.code === level &&
        enrollment.module.code === module &&
        enrollment.classroom.code === classroom
    );
  }
  getByCpf(value: string): Enrollment | undefined {
    return this.enrollments.find((enrollment) => enrollment.student.cpf.value === value);
  }
  count(): number {
    return this.enrollments.length;
  }
}
