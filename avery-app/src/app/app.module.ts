import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { DynamicGreetInputComponent } from './greeter/dynamic-greet-input/dynamic-greet-input.component';
import { SharedModule } from './shared/shared.module';
import { HeroSplashComponent } from './hero-splash/hero-splash.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInputComponent } from './todo-list/todo-input/todo-input.component';
import { TodoDisplayComponent } from './todo-list/todo-display/todo-display.component';
import { TodoActions } from './actions/todo.actions';
import { todosReducer } from './store/todos.reducer'

@NgModule({
  declarations: [
    AppComponent,
    GreeterComponent,
    DynamicGreetInputComponent,
    HeroSplashComponent,
    TodoListComponent,
    TodoInputComponent,
    TodoDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    StoreModule.provideStore({
      todos: todosReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [TodoActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
