import RepositoryDatabaseFactory from "../../adapter/factory/database/RepositoryDatabaseFactory";
import HttpServer from "../http/HttpServer";

const repositoryFactory = new RepositoryDatabaseFactory();
HttpServer.start(repositoryFactory);
