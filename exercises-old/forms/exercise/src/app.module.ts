import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PizzaEditorComponent } from './pizza-editor.component'
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, PizzaEditorComponent],
  bootstrap: [AppComponent]
})
export class MyAppModule {

}
