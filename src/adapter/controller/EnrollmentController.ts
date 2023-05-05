import RepositoryAbastractFactory from "../../domain/factory/RepositoryAbastractFactory";
import { EnrollmentStudentOutputDTO } from "../../domain/usecase/DTO/EnrollmentStudentDTO";
import { GetEnrollmentOutputDTO } from "../../domain/usecase/DTO/GetEnrollmentDTO";
import EnrollStudentUsecase from "../../domain/usecase/EnrollStudentUsecase";
import GetEnrollmentUsecase from "../../domain/usecase/GetEnrollmentUsecase";

export default class EnrollmentController {
  constructor(public repositoryFactory: RepositoryAbastractFactory) {}

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
}
