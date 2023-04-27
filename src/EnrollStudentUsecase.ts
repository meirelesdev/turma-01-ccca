import Student from "./Student";

export default class EnrollStudentUsecase {
  enrollments: any[];
  levels: any[];
  modules: any[];
  classes: any[];

  constructor() {
    this.levels = [
      {
        code: "EF1",
        description: "Ensino Fundamental I"
      },
      {
        code: "EF2",
        description: "Ensino Fundamental II"
      },
      {
        code: "EM",
        description: "Ensino Médio"
      }
    ];

    this.modules = [
      {
        level: "EF1",
        code: "1",
        description: "1o Ano",
        minimumAge: 6,
        price: 15000
      },
      {
        level: "EF1",
        code: "2",
        description: "2o Ano",
        minimumAge: 7,
        price: 15000
      },
      {
        level: "EF1",
        code: "3",
        description: "3o Ano",
        minimumAge: 8,
        price: 15000
      },
      {
        level: "EF1",
        code: "4",
        description: "4o Ano",
        minimumAge: 9,
        price: 15000
      },
      {
        level: "EF1",
        code: "5",
        description: "5o Ano",
        minimumAge: 10,
        price: 15000
      },
      {
        level: "EF2",
        code: "6",
        description: "6o Ano",
        minimumAge: 11,
        price: 14000
      },
      {
        level: "EF2",
        code: "7",
        description: "7o Ano",
        minimumAge: 12,
        price: 14000
      },
      {
        level: "EF2",
        code: "8",
        description: "8o Ano",
        minimumAge: 13,
        price: 14000
      },
      {
        level: "EF2",
        code: "9",
        description: "9o Ano",
        minimumAge: 14,
        price: 14000
      },
      {
        level: "EM",
        code: "1",
        description: "1o Ano",
        minimumAge: 15,
        price: 17000
      },
      {
        level: "EM",
        code: "2",
        description: "2o Ano",
        minimumAge: 16,
        price: 17000
      },
      {
        level: "EM",
        code: "3",
        description: "3o Ano",
        minimumAge: 17,
        price: 17000
      }
    ];

    this.classes = [
      {
        level: "EM",
        module: "3",
        code: "A",
        capacity: 2
      }
    ];

    this.enrollments = [];
  }
  execute(input: any): { student: Student, code: string } {
    const student = new Student(input.student.name, input.student.cpf);

    const level = this.levels.find(level => level.code === input.level);
    if (!level) throw new Error('Level not found');
    const module = this.modules.find(module => module.level === input.level && module.code === input.module);
    if (!module) throw new Error('Module not found');
    const clazz = this.classes.find(clazz => clazz.code === input.class);
    if (!clazz) throw new Error('Class not found');
    const age = (new Date().getFullYear() - new Date(input.student.birthDate).getFullYear())
    if (age < module.minimumAge) throw new Error("Student below minimum age")
    const studentsEnrolledInclass = this.enrollments.filter(enrollment => enrollment.level === input.level && enrollment.module === input.module && enrollment.class === input.class);
    if (studentsEnrolledInclass.length >= clazz.capacity) throw new Error("Class is over capacity");
    const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === input.student.cpf);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");

    const enrollmentDate = new Date();
    const sequence = new String(this.enrollments.length + 1).padStart(4, "0");
    const code = `${enrollmentDate.getFullYear()}${level.code}${module.code}${clazz.code}${sequence}`;

    const enrollment = {
      student,
      code,
      level: level.code,
      module: module.code,
      class: clazz.code,
    }

    this.enrollments.push(enrollment);
    return enrollment
  }
}