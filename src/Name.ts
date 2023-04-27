export default class Name {
  value: string;
  constructor(value: string) {
    const result = /^([A-Za-z]+ )+([A-Za-z])+$/.test(value)
    if (!result) throw new Error("Invalid student name");
    this.value = value;
  }
}