import {Component} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-users-home',
  template: 'Users List Home Route'
})
export class UsersHomeComponent {}

@Component({
  selector: 'rio-users-container',
  template: `
  <div style="border: 1px solid black; padding: 10px; display: flex">
    <div style="width: 40%;">
      <rio-user-list [users]="users"></rio-user-list>
    </div>
    <div style="flex: 1">
      <router-outlet></router-outlet>
    </div>
  </div>
  `
})
export class UsersContainerComponent {
  public users: any;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
   this.users = this.usersService.getUserNames();
  }
}
