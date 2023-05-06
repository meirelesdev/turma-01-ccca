import express from "express";
import cors from "cors";
import RepositoryDatabaseFactory from "../../adapter/factory/database/RepositoryDatabaseFactory";
import Router from "./Routes";

export default class HttpServer {
  private constructor() {}

  static start(repositoryFactory: RepositoryDatabaseFactory) {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(Router.build(repositoryFactory));
    app.listen(3000);
  }
}
