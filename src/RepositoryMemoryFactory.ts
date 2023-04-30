import RepositoryAbastractFactory from "./RepositoryAbastractFactory";
import ClassroomRepository from "./ClassroomRepository";
import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepository from "./EnrollmentRepository";
import EnrollmentRepositoryMemory from "./EnrollmentRepositoryMemory";
import LevelRepository from "./LevelRepository";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepository from "./ModuleRepository";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";

export default class RepositoryMemoryFactory implements RepositoryAbastractFactory {
  createLevelRepository(): LevelRepository {
    return new LevelRepositoryMemory();
  }
  createModuleRepository(): ModuleRepository {
    return new ModuleRepositoryMemory();
  }
  createClassroomRepository(): ClassroomRepository {
    return new ClassroomRepositoryMemory();
  }
  createEnrollmentRepository(): EnrollmentRepository {
    return new EnrollmentRepositoryMemory();
  }
}
