import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { App } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [App, FormatFileSizePipe],
  bootstrap: [App]
})
export class MyAppModule {

}
