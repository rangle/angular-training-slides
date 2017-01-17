import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, FormatFileSizePipe],
  bootstrap: [AppComponent]
})
export class MyAppModule {

}
