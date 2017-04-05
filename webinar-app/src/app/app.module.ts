import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TodoDisplayComponent } from './components/todo-display/todo-display.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TodoService } from './services/todo.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/todo-reducer';
import { userReducer } from './store/users-reducer';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    TodoDisplayComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({
      todoList: todoReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })

  ],
  providers: [ TodoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
