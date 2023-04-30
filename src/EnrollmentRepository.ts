import Enrollment from "./Enrollment";

export default interface EnrollmentRepository {
  save(enrollment: Enrollment): void;
  findAllByClass(level: string, module: string, classroom: string): Enrollment[];
  getByCpf(value: string): Enrollment | undefined;
  get(code: string): Enrollment | undefined;
  count(): number;
}
