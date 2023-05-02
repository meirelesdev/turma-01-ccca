export interface PayInvoiceInputDTO {
  code: string;
  month: number;
  year: number;
  amount: number;
  paymentDate: Date;
}
export type InvoiceOutputDTO = {
  amount: number;
  status: string;
  dueDate: Date;
  penalty: number;
  interests: number;
  balance: number;
};
