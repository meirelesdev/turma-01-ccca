import Enrollment from "./Enrollment";

export default interface EnrollmentRepository {
  save(enrollment: any): void;
  findAllByClass(level: string, module: string, classroom: string): Enrollment[];
  getByCpf(value: string): Enrollment | undefined;
  count(): number;
}
