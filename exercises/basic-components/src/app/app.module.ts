import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  RootComponent,
  Parent,
  ChildOne,
  ChildTwo
} from './root.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    RootComponent,
    Parent,
    ChildOne,
    ChildTwo,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}