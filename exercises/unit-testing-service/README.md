# Exercies: Unit Testing a Service

_app.component.ts_

```ts
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
```

_user.service.ts_

```ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from './user.model';

@Injectable()
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: Http) {}

  getUserList(): Observable<User[]> {
    return this.http.get(this.baseUrl).map(users => users.json());
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.baseUrl}/${id}`).map(user => user.json());
  }
}
```

_user.model.ts_

```ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
```

Create unit tests for the `UserService` to verify that:

1. When calling the method `getUserList` it should try to perform a `GET` request to the correct URL
1. When calling the method `getUserList` it should return an `Observable` that emits `User`s
