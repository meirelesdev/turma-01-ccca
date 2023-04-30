export class EnrollmentStudentInputDTO {
  studentName: string;
  studentCpf: string;
  studentBirthDate: string;
  level: string;
  module: string;
  classroom: string;
  installments: number;
  constructor({
    studentName,
    studentCpf,
    studentBirthDate,
    level,
    module,
    classroom,
    installments = 12,
  }: {
    studentName: string;
    studentCpf: string;
    studentBirthDate: string;
    level: string;
    module: string;
    classroom: string;
    installments?: number;
  }) {
    this.studentName = studentName;
    this.studentCpf = studentCpf;
    this.studentBirthDate = studentBirthDate;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.installments = installments;
  }
}

export class EnrollmentStudentOutputDTO {
  code: string;
  invoices: object[];
  constructor(code: string) {
    this.code = code;
    this.invoices = [];
  }
}
