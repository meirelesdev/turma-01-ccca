import Module from "../../../domain/entity/Module";
import ModuleRepository from "../../../domain/repository/ModuleRepository";
import Connection from "../../../infra/database/connection";

export default class ModuleRepositoryDatabase implements ModuleRepository {
  async findByLevelAndCode(level: string, code: string): Promise<Module> {
    const moduleData = await Connection.query(
      "SELECT * FROM system.module WHERE level = $1 AND code = $2",
      [level, code]
    );
    if (!moduleData) throw new Error("Module not found");
    return new Module({
      level: moduleData.level,
      code: moduleData.code,
      description: moduleData.description,
      minimumAge: moduleData.minimum_age,
      price: moduleData.price,
    });
  }
}
