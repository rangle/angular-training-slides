import { Injectable } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';


@Injectable()
export class TodoService {
  private id = 0;
  todoList$: BehaviorSubject<Array<TodoListItem>>;

  todoList: Array<TodoListItem> = [
    this.getTodoItem('Buy Milk'),
    this.getTodoItem('Get Gas'),
  ];

  constructor(private http: Http,
              private store: Store<any>) {
    this.todoList$ = new BehaviorSubject(this.todoList);
  }

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

  emitTodos(){
    this.todoList$.next(this.todoList);
  }

  addTodos(todo: string) {
    this.todoList = this.todoList
      .concat(this.getTodoItem(todo));
    this.emitTodos();
  }

  private getTodoItem(todoText: string, isCompleted: boolean = false): TodoListItem {
    const newID = this.id++;
    console.log('next ID is: ', newID, todoText);
    return new TodoListItem(newID, todoText, isCompleted);
  }

  completeTodo(id: number) {
    this.todoList = this.todoList.map(todoItem => {
      if (todoItem.id === this.id) {
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
