import ClassroomRepository from "./ClassroomRepository";
import EnrollmentRepository from "./EnrollmentRepository";
import LevelRepository from "./LevelRepository";
import ModuleRepository from "./ModuleRepository";

export default interface RepositoryAbastractFactory {
  createLevelRepository(): LevelRepository;
  createModuleRepository(): ModuleRepository;
  createClassroomRepository(): ClassroomRepository;
  createEnrollmentRepository(): EnrollmentRepository;
}
