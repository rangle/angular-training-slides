export interface ITodoListItem {
  id: number;
  label: string;
  isCompleted: boolean;
}

export class TodoListItem implements ITodoListItem {
  id: number;
  label: string;
  isCompleted: boolean;

  constructor(id, label, isCompleted = false) {
    this.id = id;
    this.label = label;
    this.isCompleted = isCompleted;
  }
}
