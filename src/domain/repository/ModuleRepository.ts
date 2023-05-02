import Module from "../entity/Module";

export default interface ModuleRepository {
  findByLevelAndCode(level: string, code: string): Promise<Module>;
}
