import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, CustomComponent } from './';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    CustomComponent,
  ],
  imports: [
    BrowserModule,
  ],
})
export class AppModule {}
