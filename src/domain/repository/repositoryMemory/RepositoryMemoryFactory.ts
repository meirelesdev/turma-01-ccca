import ClassroomRepositoryMemory from "./ClassroomRepositoryMemory";
import LevelRepositoryMemory from "./LevelRepositoryMemory";
import ModuleRepositoryMemory from "./ModuleRepositoryMemory";
import EnrollmentRepositoryMemorySingleton from "./EnrollmentRepositoryMemorySingleton";
import LevelRepository from "../LevelRepository";
import RepositoryAbastractFactory from "../../factory/RepositoryAbastractFactory";
import ModuleRepository from "../ModuleRepository";
import ClassroomRepository from "../ClassroomRepository";
import EnrollmentRepository from "../EnrollmentRepository";

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
