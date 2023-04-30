import Clonable from "./Clonable";
import InvoiceEvent from "./InvoiceEvent";

export default class Invoice implements Clonable {
  code: string;
  month: number;
  year: number;
  amount: number;
  events: InvoiceEvent[];

  constructor(code: string, month: number, year: number, amount: number) {
    this.code = code;
    this.month = month;
    this.year = year;
    this.amount = amount;
    this.events = [];
  }

  addEvent(invoiceEvent: InvoiceEvent): void {
    this.events.push(invoiceEvent);
  }

  getBalance(): number {
    return this.events.reduce((total, event) => {
      return (total -= event.amount);
    }, this.amount);
  }

  clone(): object {
    return JSON.parse(JSON.stringify(this));
  }
}
