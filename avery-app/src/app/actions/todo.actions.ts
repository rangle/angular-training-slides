import { Injectable } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoActions {
  private id = 0;

  constructor(
    private http: Http,
    private store: Store<any>
  ) { }

  getDefaultList() {
    const url = 'http://www.json-generator.com/api/json/get/bHbBeYXhnS';

    this.http
      .get(url)
      .map(data => data.json())
      .map((todos) => this.mapServerTodo(todos))
      .subscribe((data: Array<TodoListItem>) => {
        this.store.dispatch({
          type: 'DEFAULT_TODOS_RECEIVED',
          payload: data
        });
      });
  }

  mapServerTodo(todos) {
    return todos.map((todo) => {
      return this.getTodoItem(todo.label, todo.done);
    });
  }

  addTodos(todo: string) {
    this.store.dispatch({
      type: 'ADD_TODO',
      payload: {
        todo: this.getTodoItem(todo)
      }
    });
  }

  private getTodoItem(todoText: string, isCompleted: boolean = false): TodoListItem {
    const newID = this.id++;
    return new TodoListItem(newID, todoText, isCompleted);
  }

  completeTodo(todoId: number) {
    this.store.dispatch({
      type: 'COMPLETE_TODO',
      payload: {
        todoId: todoId
      }
    });
  }

  deleteTodo(todoId: number) {
    this.store.dispatch({
      type: 'DELETE_TODO',
      payload: {
        todoId: todoId
      }
    });
  }
}
