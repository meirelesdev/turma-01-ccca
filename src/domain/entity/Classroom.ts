import Period from "./Period";

type ClassroomProps = {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: Date;
  endDate: Date;
};

export default class Classroom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: Date;
  endDate: Date;
  period: Period;
  constructor({ level, module, code, capacity, startDate, endDate }: ClassroomProps) {
    this.level = level;
    this.module = module;
    this.code = code;
    this.capacity = capacity;
    this.startDate = startDate;
    this.endDate = endDate;
    this.period = new Period({ start: this.startDate, end: this.endDate });
  }

  isFinished(currentDate: Date): boolean {
    return currentDate.getTime() > this.endDate.getTime();
  }

  getProgress(currentDate: Date): number {
    const period = new Period({ start: currentDate, end: this.endDate });
    const remainingDays = this.period.getDiffInDays() - period.getDiffInDays();
    return (remainingDays / this.period.getDiffInDays()) * 100;
  }
}
