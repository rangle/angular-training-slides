import { Routes, RouterModule } from '@angular/router';
import CompanyList from '../components/company-list.component';
import Home from '../components/home.component';
import UserDetail from '../components/user-detail.component';
import UserList from '../components/user-list.component';


export const routes: Routes = [
  // step 1
  { path: '', component: Home },
  { path: 'users', component: UserList },
  { path: 'companies', component: CompanyList },
  // step 2
  { path: 'users/:id', component: UserDetail }
  /*
    Complete the Route Config Definition for:
      * /users - Route to the UsersList component
      * /companies - Route to the Company List Component
      * /  - Default route, for the Home component
  */
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
