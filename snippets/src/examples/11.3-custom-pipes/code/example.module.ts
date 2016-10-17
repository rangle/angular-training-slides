import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './';
import { ShoutPipe } from './shout-pipe';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ShoutPipe,
  ],
  imports: [
    BrowserModule,
  ],
})
export class AppModule {}
