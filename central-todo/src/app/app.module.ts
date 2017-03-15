import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoListService } from './todolist/todolist.service';
import { TestService } from './observable-test/observable-test.service';
import { ObservableTestComponent } from './observable-test/observable-test.component';
import { CounterComponent } from './counter/counter.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', redirectTo: 'forms-demo', pathMatch: 'full' },
  { path: 'forms-demo/:userName', component: FormComponent},
  { path: 'todo-demo', component: TodolistComponent,
    children : [
      {path: 'observer', component: ObservableTestComponent},
      {path: 'counter', component: CounterComponent}
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    ObservableTestComponent,
    CounterComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TodoListService,
    TestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
