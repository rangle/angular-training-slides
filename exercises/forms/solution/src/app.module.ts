import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PizzaEditor } from './pizza-editor.component'
import { App } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [App, PizzaEditor],
  bootstrap: [App]
})
export class MyAppModule {

}
