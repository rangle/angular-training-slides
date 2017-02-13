import { TodoActions } from './store/todo.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoItems$: Observable<any>;

  constructor(private store: Store<any>, private todoActions: TodoActions) {
    this.todoItems$ = store.select('todoList');
  }

  insertTodo(title) {
    let item = {
      title: title.value,
      complete: false
    };

    this.store.dispatch(this.todoActions.addTodoItem(item));
    title.value = '';
  }

  deleteTodo(id) {
    this.store.dispatch(this.todoActions.deleteTodoItem(id));
  }

  toggleTodo(id) {
    this.store.dispatch(this.todoActions.toogleComplete(id));
  }

  ngOnInit() {
    this.store.dispatch(this.todoActions.loadTodoItems());
  }
}
