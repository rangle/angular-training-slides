<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="http-advanced" -->
## Building Applications with Angular

# Advanced HTTP

---
<!-- .slide: id="http-advanced-roadmap" -->
## Roadmap

FIXME: this module needs to be updated and proof-read

---
<!-- .slide: id="http-advanced-catch-operator" -->
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

- `$` in the `thingsToDo$` variable is a naming convention for observables

#### _src/app/app.component.ts_
```ts
thingsToDo$ = this.toDoService.getChanges();
```

---
<!-- .slide: id="http-advanced-cancel-request" -->
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
<!-- .slide: id="http-advanced-cancel-request-with-takeuntil" -->
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
<!-- .slide: id="http-advanced-retry-request" -->
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
