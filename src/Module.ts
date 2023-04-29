type ModuleProps = {
  level: string;
  code: string;
  description: string;
  minimumAge: number;
  price: number;
};

export default class Module {
  price: number;
  level: string;
  code: string;
  description: string;
  minimumAge: number;

  constructor({ level, code, description, minimumAge, price }: ModuleProps) {
    this.level = level;
    this.code = code;
    this.description = description;
    this.minimumAge = minimumAge;
    this.price = price;
  }
}
