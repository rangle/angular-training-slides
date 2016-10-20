import {Component, Input} from '@angular/core';
import Users from '../services/users.service';

@Component({
  selector: 'user-list',
  template: `
  <ul>
    <li *ngFor="let user of users">
      <a [routerLink]="['/users/', user.id]">
        {{user.first}} {{user.last}}
       </a>
     </li>
  </ul>
  `
})
export default class UserList {
  @Input() users: any;
}
