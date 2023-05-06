import RepositoryAbastractFactory from "../../domain/factory/RepositoryAbastractFactory";
import IsAuthenticaded from "../../domain/usecase/IsAuthenticaded";
import Login from "../../domain/usecase/Login";

export default class SecurityController {
  constructor(public repositoryFactory: RepositoryAbastractFactory) {}

  async login(_params: any, body: any): Promise<string> {
    const login = new Login(this.repositoryFactory);
    return login.execute(body.username, body.password);
  }

  async isAuthenticated(_params: any, body: any, headers: any): Promise<boolean> {
    const token = headers.authorization;
    body.user = {
      name: "daniel",
    };
    const isAuthenticated = new IsAuthenticaded(this.repositoryFactory);
    return isAuthenticated.execute(token);
  }

  async isAuthorized(_params: any, _body: any, headers: any): Promise<boolean> {
    const token = headers.authorization;
    const isAuthenticated = new IsAuthenticaded(this.repositoryFactory);
    return isAuthenticated.execute(token);
  }
}
