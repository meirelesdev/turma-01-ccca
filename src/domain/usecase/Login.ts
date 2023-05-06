import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";

export default class Login {
  constructor(public repositoryFactory: RepositoryAbastractFactory) {}
  async execute(username: string, password: string): Promise<string> {
    return "123456";
  }
}
