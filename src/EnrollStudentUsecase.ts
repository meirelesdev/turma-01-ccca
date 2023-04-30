import classroomRepository from "./ClassroomRepository";
import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import { EnrollmentStudentInputDTO, EnrollmentStudentOutputDTO } from "./EnrollmentStudentDTO";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";
import RepositoryAbastractFactory from "./RepositoryAbastractFactory";
import Student from "./Student";

export default class EnrollStudentUsecase {
  public levelRepository: LevelRepository;
  public moduleRepository: ModuleRepository;
  public classroomRepository: classroomRepository;
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.levelRepository = repositoryFactory.createLevelRepository();
    this.moduleRepository = repositoryFactory.createModuleRepository();
    this.classroomRepository = repositoryFactory.createClassroomRepository();
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(input: EnrollmentStudentInputDTO): EnrollmentStudentOutputDTO {
    const student = new Student({
      name: input.studentName,
      cpf: input.studentCpf,
      birthDate: input.studentBirthDate,
    });
    const level = this.levelRepository.findByCode(input.level);
    const module = this.moduleRepository.findByLevelAndCode(input.level, input.module);
    const classroom = this.classroomRepository.findByCode(input.classroom);
    const studentsEnrolledInclass = this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      classroom.code
    );
    if (studentsEnrolledInclass.length >= classroom.capacity)
      throw new Error("Class is over capacity");
    const existingEnrollment = this.enrollmentRepository.getByCpf(input.studentCpf);
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
    
    const output = new EnrollmentStudentOutputDTO(enrollment.code.value);
    for (const invoice of enrollment.invoices) {
      output.invoices.push(invoice.clone());
    }
    return output;
  }
}
