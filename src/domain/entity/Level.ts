type LevelProps = { code: string; description: string };

export default class Level {
  code: string;
  description: string;

  constructor({ code, description }: LevelProps) {
    this.code = code;
    this.description = description;
  }
}
