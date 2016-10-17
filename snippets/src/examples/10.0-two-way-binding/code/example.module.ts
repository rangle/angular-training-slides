import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, ChildComponent } from './';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class AppModule {}
