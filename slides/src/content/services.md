# Services

---

## What is a Service?

- A service is a re-usable piece of functionality that can be shared across an app
- A service is just a class decorated with `@Injectable`

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class MyService { /* ... */ }
```

- Services need to be register in a module

```ts
@NgModule({
  providers: [ MyService ]
})
export class AppModule {}
```

---

## Consuming a Service

- A service can be used by components, directives, pipes or other services

```ts
@Component({ /* ... */ })
export class MyComponent {
  constructor(private myService: MyService) {}
}
```

```ts
@Injectable()
export class OtherService {
  constructor(private myService: MyService) {}
}
```

- Services are provided as singletons by the Dependency Injection (DI) system

---

## When to Use a Service

- To communicate with a REST server

```ts
@Injectable()
export class PostService {
  constructor(private http: Http) {}
  getList() { /* ...some ajax call... */ }
}
```

- To communicate with any browser specific API (localstorage, cookie, etc.)

```ts
@Injectable()
export class LocalStorageService {
  get(key) { window.localstorage.getItem(key) }
  set(key, value) { window.localstorage.setItem(key, value) }
}
```

- To handle the application state
- To define business logic

---

## The Built-in `Http` Service

Service provided by Angular to perform REST operations

```ts
@Injectable()
export class PostService {
  constructor(private http: Http){}

  getList(): Observable<Post[]> {
    return this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .map(posts => posts.json());
  }
}
```

- It has one method for every HTTP verb: `get`, `post`, `put`, etc.
- Every mehod returns an observable that emit a single value
- Connections are closed automatically after the value is emitted

---

## Importing the Http module

To be able to use the `Http` service we need to import the `HttpModule`

```ts
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  /* ... */
})
export class AppModule {}
```

[View Example](https://plnkr.co/edit/E9xJ9nUGxOQ66AbOmGXL?p=preview)