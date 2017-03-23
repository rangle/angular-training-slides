export interface ITodoListItem {
    isComplete: boolean;
    name: string;
}

export class TodoListItem implements ITodoListItem {
    name: string;
    isComplete: boolean;

    constructor(name: string, isComplete: boolean = false) {
        this.name = name;
        this.isComplete = isComplete;
    }
}