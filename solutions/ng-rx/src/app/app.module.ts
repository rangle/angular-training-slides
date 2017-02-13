
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideStore, Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';

import { TodoInputComponent } from './components/todo-input.component';
import { TodoListComponent } from './components/todo-list.component';
import { TodoReducer } from './store/Todo.reducer';
import { TodoEffects } from './store/todo.effect';
import { TodoActions } from './store/todo.action';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [AppComponent, TodoInputComponent, TodoListComponent],
  imports: [BrowserModule, FormsModule, HttpModule, StoreModule.provideStore({ todoList: TodoReducer }), EffectsModule.run(TodoEffects)],
  providers: [TodoActions, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
