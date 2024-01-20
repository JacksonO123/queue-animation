class Errors {
  private effects: ((error: string) => void)[];

  constructor() {
    this.effects = [];
  }

  onError(cb: (error: string) => void) {
    this.effects.push(cb);
  }

  distributeError(error: string) {
    this.effects.forEach((effect) => effect(error));
  }
}

const errors = new Errors();

export default errors;
