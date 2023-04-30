import Module from "./Module";

export default interface ModuleRepository {
  findByLevelAndCode(level: string, code: string): Module;
}
