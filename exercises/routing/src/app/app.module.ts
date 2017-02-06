import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing, APP_ROUTER_PROVIDERS } from './app.routes';

import HomeComponent from '../components/home.component';
import UserDetailComponent from '../components/user-detail.component';
import UserListComponent from '../components/user-list.component';

import {UsersHomeComponent, UsersContainerComponent} from '../containers/users.component';

import UsersService from '../services/users.service';

@NgModule({
  imports: [BrowserModule, routing],
  declarations: [
    AppComponent,
    HomeComponent,
    UserDetailComponent,
    UserListComponent,
    UsersContainerComponent,
    UsersHomeComponent
  ],
  providers: [APP_ROUTER_PROVIDERS, UsersService],
  bootstrap: [AppComponent]
})
export class MyAppModule {

}
