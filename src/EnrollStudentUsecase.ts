import classroomRepository from "./ClassroomRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import Student from "./Student";

export default class EnrollStudentUsecase {
  constructor(
    public levelRepository: LevelRepository,
    public moduleRepository: ModuleRepository,
    public classroomRepository: classroomRepository,
    public enrollmentRepository: EnrollmentRepository
  ) {}

  execute(input: any): Enrollment {
    const student = new Student(input.student);
    const level = this.levelRepository.findByCode(input.level);
    const module = this.moduleRepository.findByLevelAndCode(input.level, input.module);
    const classroom = this.classroomRepository.findByCode(input.class);
    const studentsEnrolledInclass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      classroom.code
    );
    if (studentsEnrolledInclass.length >= classroom.capacity)
      throw new Error("Class is over capacity");
    const existingEnrollment = this.enrollmentRepository.getByCpf(input.student.cpf);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
    const enrollmentSequence = this.enrollmentRepository.count() + 1;
    const issueDate = new Date();
    const enrollment = new Enrollment({
      student,
      level,
      module,
      classroom,
      issueDate,
      sequence: enrollmentSequence,
      installments: input.installments,
    });
    this.enrollmentRepository.save(enrollment);

    return enrollment;
  }
}
