// Don't look at this until Exercise 2

import {Component, Input} from '@angular/core';
import Users from '../services/users.service';

@Component({
  selector: 'user-list',
  template: `
  <ul>
    <li *ngFor="let user of users">
      <a>
        {{user.first}} {{user.last}}
      </a>
     </li>
  </ul>
  `
})
export default class UserList {
  public users: any;

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.users = this.usersService.getUserNames();
  }
}
