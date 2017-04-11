import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { DynamicGreetInputComponent } from './greeter/dynamic-greet-input/dynamic-greet-input.component';
import { SharedModule } from './shared/shared.module';
import { HeroSplashComponent } from './hero-splash/hero-splash.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInputComponent } from './todo-list/todo-input/todo-input.component';
import { TodoDisplayComponent } from './todo-list/todo-display/todo-display.component';

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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
