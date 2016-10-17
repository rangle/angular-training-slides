import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, HelloFromAnotherWorldComponent } from './';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    HelloFromAnotherWorldComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class AppModule {}
