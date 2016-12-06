import { Routes, RouterModule } from '@angular/router';
import { UsersHome, UsersContainer } from '../containers/users.component';
import { CompaniesHome, Companies } from '../containers/companies.component';
import Home from '../components/home.component';
import UsersListContainer from '../containers/users-list.component';
import UserDetail from '../components/user-detail.component';

/*
  - Complete the RouteConfig definition so ./containers/users.ts has child routes:
  	- default child route pointing to UsersHome
  	- child route showing details of user when given ID
  - Complete the RouteConfig definition so ./containers/companies.ts has child routes
  	- companies route should have default child route pointing to CompaniesHome
  	- child route showing users in the company when given company name using UsersListContainer
*/
export const routes: Routes = [
  {path: '', component: Home},
  {path: 'users', component: UsersContainer, children: [
  	{path: '', component: UsersHome},
  	{path: ':id', component: UserDetail},
  ]},
  {path: 'companies', component: Companies, children: [
  	{path: '', component: CompaniesHome},
  	{path: ':companyName', component: UsersListContainer},
  ]},
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
