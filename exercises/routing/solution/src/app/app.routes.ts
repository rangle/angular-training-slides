import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent, UsersContainerComponent } from '../containers/users.component';
import { CompaniesHomeComponent, CompaniesComponent } from '../containers/companies.component';
import HomeComponent from '../components/home.component';
import UsersListComponent from '../containers/users-list.component';
import UserDetailComponent from '../components/user-detail.component';

/*
  - Complete the RouteConfig definition so ./containers/users.ts has child routes:
  	- default child route pointing to UsersHome
  	- child route showing details of user when given ID
  - Complete the RouteConfig definition so ./containers/companies.ts has child routes
  	- companies route should have default child route pointing to CompaniesHome
  	- child route showing users in the company when given company name using UsersListContainer
*/
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersContainerComponent, children: [
  	{path: '', component: UsersHomeComponent},
  	{path: ':id', component: UserDetailComponent},
  ]},
  {path: 'companies', component: CompaniesComponent, children: [
  	{path: '', component: CompaniesHomeComponent},
  	{path: ':companyName', component: UsersListComponent},
  ]},
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
