import ClassRepository from "./ClassRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import Student from "./Student";

export default class EnrollStudentUsecase {
  constructor(
    public levelRepository: LevelRepository,
    public moduleRepository: ModuleRepository,
    public classRepository: ClassRepository,
    public enrollmentRepository: EnrollmentRepository
  ) { }

  execute(input: any): { student: Student, code: string } {
    const student = new Student(input.student.name, input.student.cpf, input.student.birthDate);

    const level = this.levelRepository.findByCode(input.level);
    const module = this.moduleRepository.findByLevelAndCode(input.level, input.module);
    const clazz = this.classRepository.findByCode(input.class)
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age")
    const studentsEnrolledInclass = this.enrollmentRepository.findAllByClass(level.code, module.code, clazz.code)
    if (studentsEnrolledInclass.length >= clazz.capacity) throw new Error("Class is over capacity");
    const existingEnrollment = this.enrollmentRepository.getByCpf(input.student.cpf)
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");

    const enrollmentDate = new Date();
    const sequence = new String(this.enrollmentRepository.count() + 1).padStart(4, "0");
    const code = `${enrollmentDate.getFullYear()}${level.code}${module.code}${clazz.code}${sequence}`;

    const enrollment = new Enrollment(student, level.code, module.code, clazz.code, code);
    this.enrollmentRepository.save(enrollment)
    return enrollment
  }
}