import RepositoryAbastractFactory from "../../../domain/factory/RepositoryAbastractFactory";
import LevelRepository from "../../../domain/repository/LevelRepository";
import ModuleRepository from "../../../domain/repository/ModuleRepository";
import ClassroomRepository from "../../../domain/repository/ClassroomRepository";
import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";
import LevelRepositoryDatabase from "../../repository/database/LevelRepositoryDatabase";
import ModuleRepositoryDatabase from "../../repository/database/ModuleRepositoryDatabase";
import ClassroomRepositoryDatabase from "../../repository/database/ClassroomRepositoryDatabase";
import EnrollmentRepositoryDatabase from "../../repository/database/EnrollmentRepositoryDatabase";

export default class RepositoryDatabaseFactory implements RepositoryAbastractFactory {
  createLevelRepository(): LevelRepository {
    return new LevelRepositoryDatabase();
  }
  createModuleRepository(): ModuleRepository {
    return new ModuleRepositoryDatabase();
  }
  createClassroomRepository(): ClassroomRepository {
    return new ClassroomRepositoryDatabase();
  }
  createEnrollmentRepository(): EnrollmentRepository {
    return new EnrollmentRepositoryDatabase();
  }
}
