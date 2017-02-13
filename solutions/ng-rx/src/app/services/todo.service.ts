import { Todo } from './../store/todo.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
  constructor(private http: Http) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get('http://localhost:3000/todos')
      .map(res => res.json());
  }
}