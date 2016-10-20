import {Component} from '@angular/core';
import Users from '../services/users.service';

@Component({
  selector: 'rio-root',
  styles: [ require('./app.css') ],
  template: `
  <ul>
    <li>
      <a [routerLink]="['']">Home</a>
    </li>
    <li>
      <a [routerLink]="['users']">Users</a>
    </li>
    <li>
      <a [routerLink]="['companies']">Companies</a>
    </li>
  </ul>
  <div style="border: 1px solid black; padding: 10px;">
    <router-outlet></router-outlet>
  </div>
  `
})
  // Basic Routing
  // <!-- use the routerLink directive to provide links to the Home,
  // UsersList, and CompanyList component -->
  // <ul>
  //  <li>
  //     <a>Home</a>
  //   </li>
  //   <li>
  //     <a>Users List</a>
  //   </li>
  //   <li>
  //     <a>Company List</a>
  //   </li>
  // </ul>
  // <div style="border: 1px solid black; padding: 10px;">
  //   <p>
  //     Setup the appropiate router-outlet directive,
  //     and use a default route to load the home component.
  //   </p>
  // </div>
export class App {
  public userNames: any;

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.userNames = this.usersService.getUserNames();
  }
}
