import { Injectable } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import { BehaviorSubject } from 'rxjs';

var id = 0;

@Injectable()
export class TodoService {
  todoList$: BehaviorSubject<Array<TodoListItem>>;

  todoList: Array<TodoListItem> = [
    this.getTodoItem('Buy Milk'),
    this.getTodoItem('Get Gas'),
  ];

  constructor() {
    this.todoList$ = new BehaviorSubject(this.todoList);
  }

  emitTodos(){
    this.todoList$.next(this.todoList);
  }

  addTodos(todo: string) {
    this.todoList = this.todoList
      .concat(this.getTodoItem(todo));
    this.emitTodos();
  }

  private getTodoItem(todoText: string): TodoListItem {
    return new TodoListItem(id++, todoText);
  }

  completeTodo(id: number) {
    this.todoList = this.todoList.map(todoItem => {
      if (todoItem.id === id) {
        todoItem.isCompleted = true;
      }
      return todoItem;
    });
    this.emitTodos();
  }

  deleteTodo(todoId: number) {
    this.todoList = this.todoList
      .filter(todo => todoId !== todo.id);
    this.emitTodos();
  }
}
