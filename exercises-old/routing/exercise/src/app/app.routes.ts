import { Routes, RouterModule } from '@angular/router';
import CompanyListComponent from '../components/company-list.component';
import HomeComponent from '../components/home.component';
import UserDetailComponent from '../components/user-detail.component';
import UserListComponent from '../components/user-list.component';


export const routes: Routes = [
  /*
    Complete the Route Config Definition for:
      * /users - Route to the UsersList component
      * /companies - Route to the Company List Component
      * /  - Default route, for the Home component
  */
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
