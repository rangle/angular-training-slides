import {Component, Input} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-user-list',
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
export default class UserListComponent {
  @Input() users: any;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users = this.usersService.getUserNames();
  }
}
