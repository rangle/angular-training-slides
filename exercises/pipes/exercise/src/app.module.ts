import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilesizePipe } from './format-file-size.pipe'
import { App } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [App, FilesizePipe],
  bootstrap: [App]
})
export class MyAppModule {

}
