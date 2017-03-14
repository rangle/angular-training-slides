export interface ITodo {
  label: string;
  done: boolean;
}

export class Todo implements ITodo {
  label: string;
  done: false;
  constructor(label) {
    this.label = label;
    this.done = false;
  }
}

