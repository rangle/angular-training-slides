import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-user-detail',
  template: `
  <label>First Name: </label> {{user?.name?.first}} <br/>
  <label>Last Name: </label> {{user?.name?.last}} <br/>
  <label>Email: </label> {{user?.email}}
  `
})
export default class UserDetailComponent {
  public user: any;
  private subscription: any;

  constructor(private usersService: UsersService /*, load route service */) {}

  ngOnInit() {
    // Set correct user id from the router params
    const userId = '56b35c39533e5e7b8765c36b';
    this.user = this.usersService.getUserById(userId);
  }

  ngOnDestroy() {

  }
}