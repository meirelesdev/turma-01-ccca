import Classroom from "../../../domain/entity/Classroom";
import ClassroomRepository from "../../../domain/repository/ClassroomRepository";
import Connection from "../../../infra/database/connection";

export default class ClassroomRepositoryDatabase implements ClassroomRepository {
  async findByCode(code: string): Promise<Classroom> {
    const classroomData = await Connection.query("SELECT * FROM system.classroom WHERE code = $1", [
      code,
    ]);
    if (!classroomData) throw new Error("Class not found");
    return new Classroom({
      level: classroomData.level,
      module: classroomData.module,
      code: classroomData.code,
      capacity: classroomData.capacity,
      startDate: new Date(classroomData.start_date),
      endDate: new Date(classroomData.end_date),
    });
  }
}
