import Enrollment from "../../../domain/entity/Enrollment";
import Invoice from "../../../domain/entity/Invoice";
import InvoiceEvent from "../../../domain/entity/InvoiceEvent";
import Student from "../../../domain/entity/Student";
import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";
import Connection from "../../../infra/database/connection";
import ClassroomRepositoryDatabase from "./ClassroomRepositoryDatabase";
import LevelRepositoryDatabase from "./LevelRepositoryDatabase";
import ModuleRepositoryDatabase from "./ModuleRepositoryDatabase";

export default class EnrollmentRepositoryDatabase implements EnrollmentRepository {
  levelRepository: LevelRepositoryDatabase;
  moduleRepository: ModuleRepositoryDatabase;
  classroomRepository: ClassroomRepositoryDatabase;
  constructor() {
    this.levelRepository = new LevelRepositoryDatabase();
    this.moduleRepository = new ModuleRepositoryDatabase();
    this.classroomRepository = new ClassroomRepositoryDatabase();
  }
  async getAll(): Promise<Enrollment[]> {
    const enrollemntsData = await Connection.query("SELECT code FROM system.enrollment", []);
    const result = [];
    for (const enrollmentData of enrollemntsData) {
      const enrollment = await this.get(enrollmentData.code);
      result.push(enrollment);
    }
    return result;
  }

  async get(code: string): Promise<Enrollment> {
    const enrollmentData = await Connection.oneOrNone(
      "SELECT * FROM system.enrollment WHERE code = $1",
      [code]
    );
    if (!enrollmentData) throw new Error("Enrollment not found");
    const studentData = await Connection.one("SELECT * FROM system.student WHERE cpf = $1", [
      enrollmentData.student,
    ]);
    if (!studentData) throw new Error("Student not found");
    const student = new Student({
      name: studentData.name,
      cpf: studentData.cpf,
      birthDate: studentData.birth_date,
    });
    const level = await this.levelRepository.findByCode(enrollmentData.level);
    const module = await this.moduleRepository.findByLevelAndCode(
      enrollmentData.level,
      enrollmentData.module
    );
    const classroom = await this.classroomRepository.findByCode(enrollmentData.classroom);
    const enrollment = new Enrollment({
      student,
      level,
      module,
      classroom,
      issueDate: enrollmentData.issue_date,
      sequence: enrollmentData.sequence,
      installments: enrollmentData.installments,
      status: enrollmentData.status,
    });
    const invoicesData = await Connection.query(
      "SELECT * FROM system.invoice WHERE enrollment = $1",
      [code]
    );
    const invoices = [];
    for (const invoiceData of invoicesData) {
      const invoice = new Invoice(code, invoiceData.month, invoiceData.year, invoiceData.amount);
      const invoiceEvents = [];
      const invoiceEventsData = await Connection.query(
        "SELECT * FROM system.invoice_event WHERE enrollment = $1 AND month = $2 AND year = $3",
        [code, invoiceData.month, invoiceData.year]
      );
      for (const invoiceEventData of invoiceEventsData) {
        const invoiceEvent = new InvoiceEvent(invoiceEventData.type, invoiceEventData.amount);
        invoiceEvents.push(invoiceEvent);
      }
      invoice.events = invoiceEvents;
      invoices.push(invoice);
    }
    enrollment.invoices = invoices;
    return enrollment;
  }

  async save(enrollment: Enrollment): Promise<void> {
    await Connection.one(
      "INSERT INTO system.enrollment (code, sequence, level, module, classroom, student, installments, issue_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
      [
        enrollment.code.value,
        enrollment.sequence,
        enrollment.level.code,
        enrollment.module.code,
        enrollment.classroom.code,
        enrollment.student.cpf.value,
        enrollment.installments,
        enrollment.issueDate,
        enrollment.status,
      ]
    );
    await Connection.one(
      "INSERT INTO system.student (name, cpf, birth_date) VALUES ($1, $2, $3) returning *",
      [enrollment.student.name.value, enrollment.student.cpf.value, enrollment.student.birthDate]
    );
    for (const invoice of enrollment.invoices) {
      await Connection.one(
        "INSERT INTO system.invoice (enrollment, month, year, due_date, amount) VALUES ($1, $2, $3, $4, $5) returning *",
        [enrollment.code.value, invoice.month, invoice.year, invoice.dueDate, invoice.amount]
      );
    }
  }

  async update(enrollment: Enrollment): Promise<void> {
    await Connection.none("update system.enrollment set status = $1 where code = $2", [
      enrollment.status,
      enrollment.code.value,
    ]);
    for (const invoice of enrollment.invoices) {
      for (const invoiceEvent of invoice.events) {
        await Connection.none(
          "insert into system.invoice_event (enrollment, month, year, type, amount) values ($1, $2, $3, $4, $5) on conflict do nothing",
          [
            enrollment.code.value,
            invoice.month,
            invoice.year,
            invoiceEvent.type,
            invoiceEvent.amount,
          ]
        );
      }
    }
  }

  async findAllByClass(level: string, module: string, classroom: string): Promise<Enrollment[]> {
    const enrollmentsData = await Connection.query(
      "SELECT * FROM system.enrollment WHERE level = $1 AND module = $2 AND classroom = $3",
      [level, module, classroom]
    );
    const enrollments = [];
    for (const enrollmentData of enrollmentsData) {
      const enrollment = await this.get(enrollmentData.code);
      enrollments.push(enrollment);
    }
    return enrollments;
  }

  async getByCpf(cpf: string): Promise<Enrollment | undefined> {
    const enrollmentData = await Connection.oneOrNone(
      "SELECT * FROM system.enrollment WHERE student = $1",
      [cpf]
    );
    if (!enrollmentData) return;
    return this.get(enrollmentData.code);
  }

  async count(): Promise<number> {
    const enrollments = await Connection.one("SELECT count(*) FROM system.enrollment", []);
    return enrollments.count;
  }

  async clean(): Promise<void> {
    await Connection.query("DELETE FROM system.invoice_event", []);
    await Connection.query("DELETE FROM system.invoice", []);
    await Connection.query("DELETE FROM system.enrollment", []);
    await Connection.query("DELETE FROM system.student", []);
  }
}
