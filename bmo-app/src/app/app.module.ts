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
import { TodoListService } from './services/todo-list.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoListReducer } from './store/todo-list';
import { helloReducer } from './store/hello';

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
    HttpModule,
    StoreModule.provideStore({ 
      todoList: todoListReducer,
      hello: helloReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [
    TodoListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
