<!-- .slide: data-background="../content/images/title-slide.jpg" -->
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

- Services need to be registered in a module

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

[View Example](https://plnkr.co/edit/l4n2upSueYw5UbFjZB1C?p=preview)

---

## Handling `http` rejections

To catch rejections we can use the `subscribe` operator's `onError` callback

```ts
  this.http.post(`${ BASE_URL }/auth/login`, payload)
    .map(response => response.json())
    .subscribe(
      (authData) => this.storeToken(authData.id_token), // onNext function
      (err) => console.error(err),                      // onError function
      () => console.log('Authentication Complete')      // onComplete function
    );
```

---

## Using the `.catch` operator

- Using `.catch` we can inspect an error and decide how to handle it
- By not calling `subscribe` our code is more declarative
- Can take advantage of the `async` pipe in your template

```ts
  search(term: string) {
    return this.http.get(`https://api.spotify.com/v1/dsds?q=${term}&type=artist`)
      .map(response => response.json())
      .catch(e => {
        if (e.status >==  500) return cachedVersion();

        return Observable.throw(
          new Error(`${ e.status } ${ e.statusText }`)
        );
      }
  });
```

---

## Cancel a Request

- One of the greatest benefits to using observables over promises is the ability to cancel `http` requests

```ts
  search() {
    const request = this.searchService.search(this.searchField.value)
      .subscribe(
        result => { this.result = result.artists.items; },
        err => { this.errorMessage = err.message; },
        () => { console.log('Completed'); }
      );

    setTimeout(() => {request.unsubscribe()}, 0); // cancel request after 0 milliseconds
  }
```
[View Example](http://plnkr.co/edit/MByeTy?p=preview)

---

## Cancel a Request with `takeUntil`

- Managing subscription cancellation via `unsubscribe` can get messy
- The `takeUntil` operator allows us to compose your subscription management
- `takeUntil` emits items from an observable until a given observable emits an item

```ts
search() {
  const request = this.searchService.search(this.searchField.value)
    .takeUntil(someOtherStream) // take until someOtherStream emits an item
    .subscribe(
      result => { this.result = result.artists.items; },
      err => { this.errorMessage = err.message; },
      () => { this.cancelMessage = 'Your request has been cancelled' }
    );
}
```

- **NOTE:** `takeUntil` will complete the observable unlike `unsubscribe`

[View Example](https://plnkr.co/edit/v2aGkTCmi34jBr7an1i8?p=preview)

---

## Retry a request

- Retry a failed request with the `retry` operator
- Useful for when a user's connection is lost
- `retry` takes an argument to specify the number of retries
- if no argument is given, the request will be retried indefinitely

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

## Converting requests into promises

`toPromise()` converts observables returned from the http client into promises

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
