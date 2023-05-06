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

  async getEnrollments(currentDate: Date = new Date()): Promise<GetEnrollmentOutputDTO[]> {
    const getEnrollments = new GetEnrollmentsUsecase(this.repositoryFactory);
    const output = await getEnrollments.execute(currentDate);
    return output;
  }

  async enrollStudent(body: any): Promise<EnrollmentStudentOutputDTO> {
    const enrollStudent = new EnrollStudentUsecase(this.repositoryFactory);
    const input = {
      ...body,
    };
    const output = await enrollStudent.execute(input);
    return output;
  }

  async getEnrollment(
    code: string,
    currentDate: Date = new Date()
  ): Promise<GetEnrollmentOutputDTO> {
    const getEnrollment = new GetEnrollmentUsecase(this.repositoryFactory);
    const output = await getEnrollment.execute(code, currentDate);
    return output;
  }

  async payInvoice(code: string, input: PayInvoiceInputDTO): Promise<void> {
    const payInvoice = new PayInvoiceUsecase(this.repositoryFactory);
    await payInvoice.execute({
      ...input,
      code,
    });
  }

  async cancelEnrollment(code: string): Promise<void> {
    const cancelEnrollment = new CancelEnrollmentUsecase(this.repositoryFactory);
    await cancelEnrollment.execute(code);
  }
}
