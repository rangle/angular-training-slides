import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ButtonGroupingComponent } from './button-grouping';
import { CounterDisplayComponent } from './counter-display';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  declarations: [
    AppComponent,
    ButtonGroupingComponent,
    CounterDisplayComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
