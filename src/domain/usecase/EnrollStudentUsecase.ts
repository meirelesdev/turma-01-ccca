import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";
import Enrollment from "../entity/Enrollment";
import Student from "../entity/Student";
import ClassroomRepository from "../repository/ClassroomRepository";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import LevelRepository from "../repository/LevelRepository";
import ModuleRepository from "../repository/ModuleRepository";
import { EnrollmentStudentInputDTO, EnrollmentStudentOutputDTO } from "./DTO/EnrollmentStudentDTO";

export default class EnrollStudentUsecase {
  public levelRepository: LevelRepository;
  public moduleRepository: ModuleRepository;
  public classroomRepository: ClassroomRepository;
  public enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbastractFactory) {
    this.levelRepository = repositoryFactory.createLevelRepository();
    this.moduleRepository = repositoryFactory.createModuleRepository();
    this.classroomRepository = repositoryFactory.createClassroomRepository();
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  async execute(input: EnrollmentStudentInputDTO): Promise<EnrollmentStudentOutputDTO> {
    const student = new Student({
      name: input.studentName,
      cpf: input.studentCpf,
      birthDate: input.studentBirthDate,
    });
    const level = await this.levelRepository.findByCode(input.level);
    const module = await this.moduleRepository.findByLevelAndCode(input.level, input.module);
    const classroom = await this.classroomRepository.findByCode(input.classroom);
    const studentsEnrolledInclass = await this.enrollmentRepository.findAllByClass(
      level.code,
      module.code,
      classroom.code
    );
    if (studentsEnrolledInclass.length >= classroom.capacity)
      throw new Error("Class is over capacity");
    const existingEnrollment = await this.enrollmentRepository.getByCpf(input.studentCpf);
    if (existingEnrollment) throw new Error("Enrollment with duplicated student is not allowed");
    const enrollmentSequence = (await this.enrollmentRepository.count()) + 1;
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
    await this.enrollmentRepository.save(enrollment);

    const output: EnrollmentStudentOutputDTO = { code: enrollment.code.value, invoices: [] };
    for (const invoice of enrollment.invoices) {
      const invoiceData = {
        amount: invoice.amount,
        status: invoice.getStatus(issueDate),
        dueDate: invoice.dueDate,
        penalty: invoice.getPenalty(issueDate),
        interests: invoice.getInterests(issueDate),
        balance: invoice.getBalance(),
      };
      output.invoices.push(invoiceData);
    }
    return output;
  }
}
