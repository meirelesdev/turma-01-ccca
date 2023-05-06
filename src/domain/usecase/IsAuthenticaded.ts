import RepositoryAbastractFactory from "../factory/RepositoryAbastractFactory";

export default class IsAuthenticaded {
  constructor(public repositoryFactory: RepositoryAbastractFactory) {}
  async execute(token: string): Promise<boolean> {
    if (token !== "123456") throw new Error("Not authenticated");
    return true;
  }
}
