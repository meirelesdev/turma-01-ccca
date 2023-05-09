import RepositoryAbastractFactory from "../../domain/factory/RepositoryAbastractFactory";
import CancelEnrollmentUsecase from "../../domain/usecase/CancelEnrollmentUsecase";
import { EnrollmentStudentOutputDTO } from "../../domain/usecase/DTO/EnrollmentStudentDTO";
import { GetEnrollmentOutputDTO } from "../../domain/usecase/DTO/GetEnrollmentDTO";
import { PayInvoiceInputDTO } from "../../domain/usecase/DTO/PayInvoiceDTO";
import EnrollStudentUsecase from "../../domain/usecase/EnrollStudentUsecase";
import GetEnrollmentsUsecase from "../../domain/usecase/GetEnrollmentsUsecase";
import GetEnrollmentUsecase from "../../domain/usecase/GetEnrollmentUsecase";
import PayInvoiceUsecase from "../../domain/usecase/PayInvoiceUsecase";

export default class EnrollmentController {
  constructor(public repositoryFactory: RepositoryAbastractFactory) {}

  async getEnrollments(_params: any, body: any): Promise<GetEnrollmentOutputDTO[]> {
    const currentDate = body.currentDate || new Date();
    const getEnrollments = new GetEnrollmentsUsecase(this.repositoryFactory);
    const output = await getEnrollments.execute(currentDate);
    return output;
  }

  async getEnrollment(params: any, body: any): Promise<GetEnrollmentOutputDTO> {
    const code = params.code;
    const currentDate = body.currentDate || new Date();
    const getEnrollment = new GetEnrollmentUsecase(this.repositoryFactory);
    const output = await getEnrollment.execute(code, currentDate);
    return output;
  }

  async enrollStudent(_params: any, body: any): Promise<EnrollmentStudentOutputDTO> {
    const enrollStudent = new EnrollStudentUsecase(this.repositoryFactory);
    const input = {
      ...body,
    };
    console.log(body);
    const output = await enrollStudent.execute(input);
    return output;
  }

  async cancelEnrollment(params: any): Promise<void> {
    const code = params.code;
    const cancelEnrollment = new CancelEnrollmentUsecase(this.repositoryFactory);
    await cancelEnrollment.execute(code);
    return;
  }

  async payInvoice(params: any, body: any): Promise<void> {
    const code = params.code;
    const paymentDate = new Date(body.paymentDate);
    const month = Number(body.month);
    const year = Number(body.year);
    const input = { code, month, year, amount: body.amount, paymentDate };
    const payInvoice = new PayInvoiceUsecase(this.repositoryFactory);
    await payInvoice.execute(input);
    return;
  }
}
