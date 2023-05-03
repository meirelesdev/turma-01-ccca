import RepositoryAbastractFactory from "../../../domain/factory/RepositoryAbastractFactory";
import LevelRepository from "../../../domain/repository/LevelRepository";
import ModuleRepository from "../../../domain/repository/ModuleRepository";
import ClassroomRepository from "../../../domain/repository/ClassroomRepository";
import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";
import EnrollmentRepositoryMemorySingleton from "../../repository/memory/EnrollmentRepositoryMemorySingleton";
import LevelRepositoryMemory from "../../repository/memory/LevelRepositoryMemory";
import ModuleRepositoryMemory from "../../repository/memory/ModuleRepositoryMemory";
import ClassroomRepositoryMemory from "../../repository/memory/ClassroomRepositoryMemory";

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
