import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { GreeterChildComponent } from './greeter/greeter-child/greeter-child.component';
import { DynamicGreetInputComponent } from './greeter/dynamic-greet-input/dynamic-greet-input.component';
import { SharedModule } from './shared/shared.module';
import { HeroSplashComponent } from './hero-splash/hero-splash.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInputComponent } from './todo-list/todo-input/todo-input.component';
import { TodoDisplayComponent } from './todo-list/todo-display/todo-display.component';
import { TodoActions } from './actions/todo.actions';
import { todosReducer } from './store/todos.reducer'

const routes: Routes = [
  { path: '', redirectTo: 'greeter', pathMatch: 'full' },
  {
    path: 'greeter',
    component: GreeterComponent,
    children: [
      { path: 'child/:name', component: GreeterChildComponent }
    ]
  },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'hero', component: HeroSplashComponent },
  { path: '**', redirectTo: 'greeter' }
];

@NgModule({
  declarations: [
    AppComponent,
    GreeterComponent,
    GreeterChildComponent,
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
    RouterModule.forRoot(routes),
    SharedModule,
    StoreModule.provideStore({
      todos: todosReducer,
      greeter: () => 'hi'
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [TodoActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
