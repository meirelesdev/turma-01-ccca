export default interface EnrollmentRepository {
  save(enrollment: any): void;
  findAllByClass(level: string, module: string, classroom: string): any;
  getByCpf(value: string): any;
  count(): number;
}