export default interface ModuleRepository {
  findByLevelAndCode(level: string, code: string): any;
}
