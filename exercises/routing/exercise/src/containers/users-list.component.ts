// Don't look at this file until Exercise 3

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Users from '../services/users.service';

@Component({
  selector: 'users-users-container',
  template: `
    <user-list [users]="users"></user-list>`
})
export default class UsersListContainer {
  public users: any;
  private subscription: any;

  constructor(private usersService: Users /*, load route service */) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
