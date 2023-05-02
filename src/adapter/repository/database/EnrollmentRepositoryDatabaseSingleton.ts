import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryDatabase";

export default class EnrollmentRepositoryDatabaseSingleton {
  static instance: EnrollmentRepository | undefined;

  private constructor() {}

  static getInstance(): EnrollmentRepository {
    if (!EnrollmentRepositoryDatabaseSingleton.instance) {
      EnrollmentRepositoryDatabaseSingleton.instance = new EnrollmentRepositoryMemory();
    }
    return EnrollmentRepositoryDatabaseSingleton.instance;
  }
  static destroy() {
    EnrollmentRepositoryDatabaseSingleton.instance = undefined;
  }
}
