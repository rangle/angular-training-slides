import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent, UsersContainerComponent } from '../containers/users.component';
import HomeComponent from '../components/home.component';
import UsersListComponent from '../containers/users-list.component';
import UserDetailComponent from '../components/user-detail.component';

/*
  - Complete the RouteConfig definition so ./containers/users.ts has child routes:
  	- default child route pointing to UsersHome
  	- child route showing details of user when given ID
*/
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersContainerComponent, children: [
  	{path: '', component: UsersHomeComponent},
  	{path: ':id', component: UserDetailComponent},
  ]},
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
