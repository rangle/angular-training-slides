// Don't look at this file until Exercise 2

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Users from '../services/users.service';

@Component({
  selector: 'user-detail',
  template: `
  <label>First Name: </label> {{user?.name?.first}} <br/>
  <label>Last Name: </label> {{user?.name?.last}} <br/>
  <label>Email: </label> {{user.email}}
  `
})
export default class UserDetail {
  public user: any;
  private subscription: any;

  constructor(private usersService: Users /*, load route service */) {}

  ngOnInit() {
    // Set correct user id from the router params
    const userId = '56b35c39533e5e7b8765c36b';
    this.user = this.usersService.getUserById(userId);
  }

  ngOnDestroy() {

  }
}