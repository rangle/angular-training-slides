import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  template: `
    <h1>User List</h1>
    <ul>
      <li *ngFor="let user of users$ | async">
        {{ user.name }}
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.users$ = this.service.getUserList();
  }
}
