import Classroom from "../../../domain/entity/Classroom";
import ClassroomRepository from "../../../domain/repository/ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
  classes: Classroom[];

  constructor() {
    const start1 = new Date();
    const end1 = new Date();
    end1.setMonth(end1.getMonth() + 6);

    const start2 = new Date();
    start2.setMonth(start2.getMonth() - 2);
    const end2 = new Date();
    end2.setMonth(end2.getMonth() - 1);

    const start3 = new Date();
    start3.setMonth(start3.getMonth() - 6);
    const end3 = new Date();
    end3.setMonth(end3.getMonth() + 3);

    this.classes = [
      new Classroom({
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2,
        startDate: start1,
        endDate: end1,
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "B",
        capacity: 2,
        startDate: start2,
        endDate: end2,
      }),
      new Classroom({
        level: "EM",
        module: "3",
        code: "C",
        capacity: 2,
        startDate: start3,
        endDate: end3,
      }),
    ];
  }
  findByCode(code: string): Promise<Classroom> {
    const classroom = this.classes.find((classroom) => classroom.code === code);
    if (!classroom) throw new Error("Class not found");
    return Promise.resolve(classroom);
  }
}
