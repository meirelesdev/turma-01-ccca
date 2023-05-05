import Level from "../../../domain/entity/Level";
import LevelRepository from "../../../domain/repository/LevelRepository";
import Connection from "../../../infra/database/connection";

export default class LevelRepositoryDatabase implements LevelRepository {
  async findByCode(code: string): Promise<Level> {
    const levelData = await Connection.oneOrNone("SELECT * FROM system.level WHERE code = $1", [
      code,
    ]);
    if (!levelData) throw new Error("Level not found");
    return new Level({
      code: levelData.code,
      description: levelData.description,
    });
  }
}
