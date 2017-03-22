import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { BmoButtonsComponent } from './components/hello-world/bmo-buttons/bmo-buttons.component';
import { BmoButtonComponent } from './components/hello-world/bmo-buttons/bmo-button/bmo-button.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoInputComponent } from './components/todo-list/todo-input/todo-input.component';
import { TodoDisplayComponent } from './components/todo-list/todo-display/todo-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    BmoButtonsComponent,
    BmoButtonComponent,
    TodoListComponent,
    TodoInputComponent,
    TodoDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
