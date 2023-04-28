import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
  classes: any[];

  constructor() {
    this.classes = [
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2,
        start_date: "2021-06-01",
        end_date: "2021-12-15",
      },
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 10,
        start_date: "2021-05-01",
        end_date: "2021-05-30",
      },
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 10,
        start_date: "2021-05-01",
        end_date: "2021-06-30",
      }
    ];
  }
  findByCode(code: string) {
    const classroom = this.classes.find(classroom => classroom.code === code);
    if (!classroom) throw new Error('Class not found');
    return classroom;
  }
}