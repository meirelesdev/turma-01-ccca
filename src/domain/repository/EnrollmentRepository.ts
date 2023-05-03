import Enrollment from "../entity/Enrollment";

export default interface EnrollmentRepository {
  save(enrollment: Enrollment): Promise<void>;
  findAllByClass(level: string, module: string, classroom: string): Promise<Enrollment[]>;
  getByCpf(value: string): Promise<Enrollment | undefined>;
  get(code: string): Promise<Enrollment>;
  count(): Promise<number>;
}
