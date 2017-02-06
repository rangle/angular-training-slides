import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent, UsersContainerComponent } from '../containers/users.component';
import HomeComponent from '../components/home.component';
import UserDetailComponent from '../components/user-detail.component';


export const routes: Routes = [
  /*
    Complete the Route Config Definition for:
      * /home  - Route to the Home component
      * /users - Route to the UsersContainerComponent component
      * /users/:id - Route to the User Detail Component
      * A default path that redirects to 'home'
  */
];

export const APP_ROUTER_PROVIDERS = [];

export const routing = RouterModule.forRoot(routes);
