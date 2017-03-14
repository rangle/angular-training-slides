export interface ITodo {
  label: string;
  done: boolean;
}

export class Todo implements ITodo {
  label: string;
  done: boolean;
  constructor(label, done = false) {
    this.label = label;
    this.done = done;
  }
}

