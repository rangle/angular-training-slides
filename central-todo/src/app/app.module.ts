import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoListService } from './todolist/todolist.service';
import { TestService } from './observable-test/observable-test.service';
import { ObservableTestComponent } from './observable-test/observable-test.component';
import { CounterComponent } from './counter/counter.component';
import { FormComponent } from './form/form.component';

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
  ],
  providers: [
    TodoListService,
    TestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
