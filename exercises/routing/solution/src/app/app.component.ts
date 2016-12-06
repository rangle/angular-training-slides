import {Component} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-app',
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
export class AppComponent {
  public userNames: any;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.userNames = this.users.getUserNames();
  }
}
