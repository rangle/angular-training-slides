import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  AppComponent,
  ParentComponent,
  ChildOneComponent,
  ChildTwoComponent
} from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    ParentComponent,
    ChildOneComponent,
    ChildTwoComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}