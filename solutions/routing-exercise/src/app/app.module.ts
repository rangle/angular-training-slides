import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomeComponent,
    UserDetailComponent
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
