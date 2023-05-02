import { InvoiceOutputDTO } from "./PayInvoiceDTO";

export interface GetEnrollmentOutputDTO {
  code: string;
  balance: number;
  status: string;
  invoices: InvoiceOutputDTO[];
}
