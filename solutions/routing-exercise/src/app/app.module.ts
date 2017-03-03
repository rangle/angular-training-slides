import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageListComponent } from './page-list/page-list.component';
import { HomeComponent } from './home/home.component';
import { PageDetailComponent } from './page-detail/page-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    HomeComponent,
    PageDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
