import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer';
import { FareCalculatorComponent } from './fare-calculator';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  declarations: [
    AppComponent,
    TimerComponent,
    FareCalculatorComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
