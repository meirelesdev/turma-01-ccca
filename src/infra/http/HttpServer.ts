import express from "express";
import EnrollmentController from "../../adapter/controller/EnrollmentController";
import RepositoryDatabaseFactory from "../../adapter/factory/database/RepositoryDatabaseFactory";

export default class HttpServer {
  private constructor() {}

  static start(repositoryFactory: RepositoryDatabaseFactory) {
    const app = express();
    app.use(express.json());
    app.all("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
      next();
    });
    app.options("*", (req, res) => {
      res.end();
    });

    app.get("/enrollments", async (req, res) => {
      const controller = new EnrollmentController(repositoryFactory);
      try {
        const output = await controller.getEnrollments();
        res.json(output);
      } catch (error: any) {
        res.status(422);
        res.json({ message: error.message });
      }
    });

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

    app.post("/enrollments/:code/payments", async (req, res) => {
      const controller = new EnrollmentController(repositoryFactory);
      try {
        await controller.payInvoice(req.params.code, req.body);
        res.status(204);
      } catch (error: any) {
        res.status(422);
        res.json({ message: error.message });
      }
    });

    app.post("/enrollments/:code/cancel", async (req, res) => {
      const controller = new EnrollmentController(repositoryFactory);
      try {
        await controller.cancelEnrollment(req.params.code);
        res.status(204);
      } catch (error: any) {
        res.status(422);
        res.json({ message: error.message });
      }
    });

    app.listen(3000);
  }
}
