import express from "express";
import EnrollmentController from "../../adapter/controller/EnrollmentController";
import RepositoryDatabaseFactory from "../../adapter/factory/database/RepositoryDatabaseFactory";

export default class HttpServer {
  private constructor() {}

  static start(repositoryFactory: RepositoryDatabaseFactory) {
    const app = express();
    app.use(express.json());

    app.post("/enrollments", async (req, res) => {
      const controller = new EnrollmentController(repositoryFactory);
      try {
        const output = await controller.enrollStudent(req.body);
        res.json(output);
      } catch (error: any) {
        res.status(422);
        res.json({ message: error.message });
      }
    });

    app.get("/enrollments/:code", async (req, res) => {
      const controller = new EnrollmentController(repositoryFactory);
      try {
        const output = await controller.getEnrollment(req.params.code);
        res.json(output);
      } catch (error: any) {
        res.status(422);
        res.json({ message: error.message });
      }
    });

    app.listen(3000);
  }
}
