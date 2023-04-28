export default interface EnrollmentRepository {
  save(enrollment: any): void;
  findAllByClass(level: string, module: string, clazz: string): any;
  getByCpf(value: string): any;
  count(): number;
}