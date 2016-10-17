import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from './';

@NgModule({
  bootstrap: [
    LoginForm,
  ],
  declarations: [
    LoginForm,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {}
