import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { provideStore, Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';

import { TodoInputComponent } from './components/todo-input.component';
import { TodoListComponent } from './components/todo-list.component';
import { TodoActions } from './actions/todo.action';
import { TodoEffects } from './effects/todo.effect';
import { TodoService } from './services/todo.service';
import { TodoReducer } from './reducers/todo.reducer';

@NgModule({
  declarations: [AppComponent, TodoInputComponent, TodoListComponent],
  imports: [BrowserModule, FormsModule, HttpModule, StoreModule.provideStore({ TodoReducer }), EffectsModule.run(TodoEffects)],
  providers: [TodoActions, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
