import {Component, Input} from '@angular/core';

@Component({
  selector: 'rio-user-list',
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
export default class UserListComponent {
  @Input() users: any;
}
