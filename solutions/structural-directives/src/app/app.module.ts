import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LaptopListComponent } from './laptop-list';
import { FilterComponent } from './filter';
import { LaptopComponent } from './laptop';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  declarations: [
    AppComponent,
    LaptopListComponent,
    FilterComponent,
    LaptopComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
