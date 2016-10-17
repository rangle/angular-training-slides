import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, ClickAbleComponent } from './';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ClickAbleComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class AppModule {}
