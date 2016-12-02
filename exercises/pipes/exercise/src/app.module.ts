import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilesizePipe } from './format-file-size.pipe'
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, FilesizePipe],
  bootstrap: [AppComponent]
})
export class MyAppModule {

}
