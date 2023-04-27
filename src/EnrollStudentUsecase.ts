import Student from "./Student";

export default class EnrollStudentUsecase {
  enrollments: any[];
  constructor() {
    this.enrollments = [];
  }
  execute(input: any): { student: Student } {
    const student = new Student(input.student.name, input.student.cpf);

    const existingEnrollment = this.enrollments.find(enrollment => enrollment.student.cpf.value === input.student.cpf);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
    const enrollment = {
      student
    }
    this.enrollments.push(enrollment);
    return enrollment
  }
}