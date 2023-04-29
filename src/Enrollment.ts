import Classroom from "./Classroom";
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";
import Level from "./Level";
import Module from "./Module";
import Student from "./Student";

type EnrollmentProps = {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  issueDate: Date;
  sequence: number;
  installments: number;
}

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  code: EnrollmentCode;
  sequence: number;
  installments: number;
  issueDate: Date;
  invoices: Invoice[];
  constructor({ student, level, module, classroom, issueDate, sequence, installments = 12 }: EnrollmentProps) {
    if (student.getAge() < module.minimumAge) throw new Error("Student below minimum age");
    if (classroom.isFinished(issueDate)) throw new Error("Class is already finished")
    if (classroom.getProgress(issueDate) > 25) throw new Error("Class is already started");
    this.student = student;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.sequence = sequence;
    this.installments = installments;
    this.issueDate = issueDate;
    this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
    this.invoices = [];
    this.generateInvoices();
  }
  generateInvoices() {
    let installmentAmoun = Math.trunc((this.module.price / this.installments) * 100) / 100;
    for (let i = 0; i < this.installments; i++) {
      const invoice = new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentAmoun);
      this.invoices.push(invoice);
    }

    const total = this.invoices.reduce((total, invoice) => {
      total += invoice.amount;
      return total;
    }, 0);

    const rest = Math.trunc((this.module.price - total) * 100) / 100;
    this.invoices[this.installments - 1].amount = installmentAmoun + rest;
  }
}