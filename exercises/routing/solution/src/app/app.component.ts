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
export class App {
  public userNames: any;

  constructor(private users: Users) {}

  ngOnInit() {
    this.userNames = this.users.getUserNames();
  }
}
