import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { ITodo, Todo } from './todolist.model';

@Injectable()
export class TodoListService {
  state: Array<ITodo>;
  todos: Subject<Array<ITodo>>;

  constructor(private http: Http) {
    this.state = [];
    this.todos = new Subject(); 
    this.initTodos().subscribe(response => {
      const initialTodos = response.map(item => new Todo(item.label, item.done));
      this.state = initialTodos;
      this.todos.next(initialTodos);
    });
  }

  subscribeToTodos() {
    return this.todos;
  }

  initTodos(): Observable<Array<any>> {
    return this.http
      .get('http://www.json-generator.com/api/json/get/ckraFfvtNK')
      .map(response => response.json());
  }

  addTodo(label: string) {
    this.state.push(new Todo(label));
    this.todos.next(this.state);
  }

  deleteTodo(index: number) {
    this.state.splice(index, 1);
    this.todos.next(this.state);    
  }

  toggleTodo(index: number) {
    this.state[index].done = !this.state[index].done;
    this.todos.next(this.state);    
  }
}
