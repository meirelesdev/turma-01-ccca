import Cpf from "../valueObject/Cpf";
import Name from "../valueObject/Name";

type StudentProps = {
  name: string;
  cpf: string;
  birthDate: string;
};
export default class Student {
  name: Name;
  cpf: Cpf;
  birthDate: Date;
  constructor({ name, cpf, birthDate }: StudentProps) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf);
    this.birthDate = new Date(birthDate);
  }
  getAge(): number {
    return new Date().getFullYear() - this.birthDate.getFullYear();
  }
}
