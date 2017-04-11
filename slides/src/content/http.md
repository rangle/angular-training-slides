
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
