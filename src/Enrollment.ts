import Student from "./Student";

export default class Enrollment {
  constructor(public student: Student, public level: string, public module: string, public classroom: string, public code: string) { }
}