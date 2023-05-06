import express from "express";
import EnrollmentController from "../../adapter/controller/EnrollmentController";
import SecurityController from "../../adapter/controller/SecurityController";
import RepositoryAbastractFactory from "../../domain/factory/RepositoryAbastractFactory";
import ExpressConvert from "./ExpressConverter";

export default class Router {
  private constructor() {}

  static build(repositoryFactory: RepositoryAbastractFactory) {
    const router = express.Router({ mergeParams: true });
    const securityController = new SecurityController(repositoryFactory);
    const enrollmentController = new EnrollmentController(repositoryFactory);
    router.post("/login", securityController.login.bind(enrollmentController));

    router.all(
      "*",
      ExpressConvert.filter(securityController.isAuthenticated.bind(securityController))
    );
    router.all(
      "*",
      ExpressConvert.filter(securityController.isAuthorized.bind(securityController))
    );
    router.get(
      "/enrollments",
      ExpressConvert.execute(enrollmentController.getEnrollments.bind(enrollmentController))
    );
    router.post(
      "/enrollments",
      ExpressConvert.execute(enrollmentController.enrollStudent.bind(enrollmentController))
    );

    router.get(
      "/enrollments/:code",
      ExpressConvert.execute(enrollmentController.getEnrollment.bind(enrollmentController))
    );

    router.post(
      "/enrollments/:code/pay",
      ExpressConvert.execute(enrollmentController.payInvoice.bind(enrollmentController))
    );

    router.post(
      "/enrollments/:code/cancel",
      ExpressConvert.execute(enrollmentController.cancelEnrollment.bind(enrollmentController))
    );
    return router;
  }
}
