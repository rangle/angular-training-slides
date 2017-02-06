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
- Every method returns an observable that emit a single value
- Connections are closed automatically after the value is emitted

---

## Importing the `HttpModule`

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

---

## Handling `http` rejections

To catch rejections we can use the `subscribe` operator's `error` and `complete` callbacks

```ts
  this.http.post(`${ BASE_URL }/auth/login`, payload)
    .map(response => response.json())
    .subscribe(
      (authData) => this.storeToken(authData.id_token), // Next function
      (err) => console.error(err),                      // Error function
      () => console.log('Authentication Complete')      // Complete function
    );
```

---

## Using the `.catch` operator

- The `.catch` operator allows us to catch errors on a stream, do something, then pass the exception onwards
- This also means we can inspect the error and decide how to handle it

```ts
  return this.http.get('https://api.spotify.com/v1/dsds?q=' + term + '&type=artist')
    .map((response) => response.json())
    .catch(err => {
      if (err.status >==  500) {
        return cachedVersion();
      } else {
        return Observable.throw(
          new Error(`${ err.status } ${ err.statusText }`)
        );
      }
    });
```
[View Example](http://plnkr.co/edit/3lCaeI?p=preview)

---

## Cancel a Request

Cancelling an HTTP request is a common requirement. If you have a queue of requests and a new
request supersedes the pending requests, you can call `unsubscribe` on the pending request's subscription.

```ts
  const request = this.searchService.search(this.searchField.value)
    .subscribe(
      result => { this.result = result.artists.items; },
      err => { this.errorMessage = err.message; },
      () => { console.log('Completed'); }
    );

  request.unsubscribe();
```
[View Example](http://plnkr.co/edit/XQL8v9?p=preview)

---

## Retry a request

- It is possible to retry a failed request using the `.retry` operator when something goes wrong, for example, the user's connection may dropped.
- `retry` takes a `retryCount` argument that specifies the number of times to retry a failed request.
- If you do not specify `retryCount`, the request will be retried indefinitely.

```ts
  search(term: string) {
    let tryCount = 0;
    return this.http.get('https://api.spotify.com/v1/dsds?q=' + term + '&type=artist')
      .map(response => response.json())
      .retry(3);  // Will retry failed request 3 times
}
```
- **Note:** The `onError` callback will not execute during the retry phase. The stream will only throw an error after the retry phase is complete

[View Example](http://plnkr.co/edit/zSAWwV?p=preview)

---

## Search with `flatMap`

Let's say we wanted to add a search feature that makes an http request and updates search results with every keypress event in a text field.
By creating an `Observable` subscribed to events from the input field, and on every change to the input value we perform the HTTP request, which
is also an `Observable`, we create an `Observable` of an `Observable`.

By using `flatMap` we can convert the emissions of these `Observables` then flatten the emissions into a single stream

<img src="content/images/flat-map.png" alt="flat-map-diagram" width="40%" />

[View Example](http://plnkr.co/edit/L6CLXo?p=preview)

---

## Search with `switchMap`

The one downside to using `flatMap` for our search feature is that we will get results for all events in the stream and not necessarily in order.
This would be a huge problem for our search feature as we may not get the latest results back.

`switchMap` solves this problem by only subscribing to the latest event. Any time a new event comes in, `switchMap` will automatically
unsubscribe from the older event to make sure you get the latest results.

<img src="content/images/switch-map.png" alt="flat-map-diagram" width="40%" />

[View Example](http://plnkr.co/edit/FYLTcx?p=preview)

---

## Converting requests into promises

Using `toPromise()`, we can convert observables returned from Angular's http into promises

```ts
  search(term: string) {
    return this.http
      .get(`https://api.spotify.com/v1/search?q=${term}&type=artist`)
      .map((response) => response.json())
      .toPromise();
  }
```
It could then be consumed as a regular promise

```ts
  search(someSearchString)
    .then((result) => {
      this.result = result.artists.items;
    })
    .catch((error) => console.error(error));
```

**Note:** Once converted into a promise you will lose the ability to cancel the request and chain RxJs operators

---
