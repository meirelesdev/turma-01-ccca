export default class circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getArea(): number {
    return 2 * Math.PI * this.radius;
  }
}