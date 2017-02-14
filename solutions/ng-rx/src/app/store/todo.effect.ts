import { TodoActions } from './todo.action';
import { TodoService } from '../services/todo.service';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class TodoEffects {
  constructor(private update$: Actions, private todoActions: TodoActions, private todoService: TodoService) { }

  @Effect() loadTodos$ = this.update$
    .ofType(TodoActions.LOAD_TODO_ITEMS)
    .switchMap(() => this.todoService.getTodos())
    .map(todos => this.todoActions.loadTodoItemsSuccess(todos));
}