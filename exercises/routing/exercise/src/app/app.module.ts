import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { App } from './app.component';
import { routing, APP_ROUTER_PROVIDERS } from './app.routes';

import UserDetail from '../components/user-detail.component';
import UserList from '../components/user-list.component';
import CompanyList from '../components/company-list.component';
import Home from '../components/home.component';

import Users from '../services/users.service';

@NgModule({
  imports: [BrowserModule, routing],
  declarations: [
    App,
    CompanyList,
    Home,
    UserDetail,
    UserList
  ],
  providers: [APP_ROUTER_PROVIDERS, Users],
  bootstrap: [App]
})
export class MyAppModule {

}
