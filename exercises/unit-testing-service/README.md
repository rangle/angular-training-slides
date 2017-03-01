# Unit Testing a Service

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

Create unit tests for the `UserService` to verify that:

1. When calling the method `getUserList()` it should try to perform a `GET` request to the correct URL
2. When calling the method `getUserList()` it should return an `Observable` that emits `User`s

## Step 1

Using the `angular-cli` create a new project called `unit-testing-service` inside of the `training` folder.

## Step 2

Update the auto-generated `app.component.ts` to match the code shown above.  Also create a new `user.model.ts` file in the same folder and copy the interface shown above inside.  Also remove the `app.component.css`, `app.component.html`, and `app.component.spec.ts` files.

## Step 3

Use `cd` to move into the `unit-testing-service` folder and then create a new service using the `angular-cli` (`ng generate service User`).

## Step 4

Modify the code in the generated file `user.service.ts` to match the code shown above.

## Step 5

Modify `app.module.ts` to include the UserService among the providers.

## Step 6

Modify the generated `user.service.spec.ts` to remove the existing code in the `describe()` function

## Step 7

Create an array of 2-3 `User` objects with dummy data (dummy values for the fields, `id`, `name`, `username`, etc..) in the `user.service.spec.ts` file

## Step 8

Create a `beforeEach()` call to set up the test environment for both tests.  Inside, create an object to mock the `Http` service (call it `fakeHttp`).  That mock object should have a method `get()` that returns an `Observable` of an object that has a `json()` method that when called returns the array of mock `User`s (to simulate the `Observable` of `Response` that would be returned by `Http.get()`, hint: `Observable.of()` is useful for this)

## Step 9

In the `beforeEach()` call created in Step 8 add a `spyOn` call to spy on the `fakeHttp.get()` call.  The spy should be configured to call through to the method.

## Step 10

Configure the `TestBed` with the `UserService` and the `fakeHttp` (mocking the real `Http`).

## Step 11

Create a unit test `it()` method call to test the first test (`getUserList()` performs `GET` request with correct URL).  This can be accomplished by getting `UserService` from the `TestBed` and calling `getUserList()` and verifying that the `get()` method is called on the `fakeHttp` service with the correct URL

## Step 12

Create another unit test `it()` method call to test the second test (`getUserList()` returns `Observable` that emits `User`s).  This can be accomplished by getting `UserService` from the `TestBed` and calling `getUserList()` and subscribing to it and verifying the result matches the array of mock `User`s created in Step 7.
