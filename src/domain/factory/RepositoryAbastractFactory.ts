import ClassroomRepository from "../repository/ClassroomRepository";
import EnrollmentRepository from "../repository/EnrollmentRepository";
import LevelRepository from "../repository/LevelRepository";
import ModuleRepository from "../repository/ModuleRepository";

export default interface RepositoryAbastractFactory {
  createLevelRepository(): LevelRepository;
  createModuleRepository(): ModuleRepository;
  createClassroomRepository(): ClassroomRepository;
  createEnrollmentRepository(): EnrollmentRepository;
}
