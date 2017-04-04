import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TodoDisplayComponent } from './components/todo-display/todo-display.component';

import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    TodoDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ TodoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
