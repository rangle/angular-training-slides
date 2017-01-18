import {Component} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-app',
  styles: [ require('./app.css') ],
  template: `
  Basic Routing
  <!-- use the routerLink directive to provide links to the Home,
  UsersList, and CompanyList component -->
  <ul>
   <li>
      <a>Home</a>
    </li>
    <li>
      <a>Users List</a>
    </li>
    <li>
      <a>Company List</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <p>
      Setup the appropiate router-outlet directive,
      and use a default route to load the home component.
    </p>
  </div>
  `
})
export class AppComponent {
  public userNames: any;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.userNames = this.usersService.getUserNames();
  }
}
