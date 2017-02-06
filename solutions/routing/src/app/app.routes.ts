import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent, UsersContainerComponent } from '../containers/users.component';
import HomeComponent from '../components/home.component';
import UserDetailComponent from '../components/user-detail.component';
import UserListComponent from '../components/user-list.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersContainerComponent,
    children: [
  	{ path: '', component: UsersHomeComponent },
  	{ path: ':id', component: UserDetailComponent },
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
