import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { HeyDirective } from './hey/hey.directive';
import { CapitalizePipe } from './capitalize/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HeyDirective,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
