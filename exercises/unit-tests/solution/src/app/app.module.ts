import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './exercise-1';
import { MessageComponent } from './exercise-2';
import { MessageService } from './services/message';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    MessageComponent,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
