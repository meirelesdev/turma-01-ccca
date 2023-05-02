import { InvoiceOutputDTO } from "./PayInvoiceDTO";

export interface EnrollmentStudentInputDTO {
  studentName: string;
  studentCpf: string;
  studentBirthDate: string;
  level: string;
  module: string;
  classroom: string;
  installments: number;
}

export interface EnrollmentStudentOutputDTO {
  code: string;
  invoices: InvoiceOutputDTO[];
}
