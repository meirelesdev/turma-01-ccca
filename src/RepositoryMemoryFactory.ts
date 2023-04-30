import RepositoryAbastractFactory from "./RepositoryAbastractFactory";
import ClassroomRepository from "./ClassroomRepository";
import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepository from "./ModuleRepository";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";
import EnrollmentRepositoryMemorySingleton from "./EnrollmentRepositoryMemorySingleton";

export default class RepositoryMemoryFactory implements RepositoryAbastractFactory {
  constructor() {
    EnrollmentRepositoryMemorySingleton.destroy();
  }
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
    return EnrollmentRepositoryMemorySingleton.getInstance();
  }
}
