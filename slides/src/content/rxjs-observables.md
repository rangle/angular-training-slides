# Introduction to Observables

---

## What are Observables?

* The `Observable` is a proposed standard for managing asynchronous data for ES7 and beyond.
* Available for use via [RxJS library](https://github.com/ReactiveX/rxjs).
* Allows for effective handling of a *stream* of asynchronous events with operations similar to 
array methods like `map` and `filter`.
* Similar in purpose to Promises but also more powerful with added features like disposability.
* Angular uses it, a lot!

---

## Why Not Just Use Promises?

* Both `Promises` and `Observables` are used for dealing with asynchronous code. However, 
Observables are considered more powerful because:
  * `Observables` are more expressive.
  * `Observables` are cancellable.
  * `Observables` have rich API that make operations like retrying much easier (*i.e.*, with `retry` and 
  `retryWhen` operators).

---

## Creating an Observable

```js
import {Observable} from 'rxjs/Observable';

const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
})
```
Creating the Observable alone does not trigger anything.
Creating an Observable is like defining a function: 
- A function does not do anything until it is *called*. 
- Likewise, an Observable does not start streaming data until it's been *subscribed*.

---

## Subscribing to an Observable

```js
const subscription = observable.subscribe(
  value => console.log('value', value),    // handles next
  error => console.log('error', error),    // handles error 
  () => console.log('complete'),  // handles complete
);
```

Subscribing to the Observable we created earlier would print:

```
value 1
value 2
complete
```

Also calling `subscribe` returns a *Subscription* object which is used to *dispose* or *cancel*
execution of an Observable.

---

## Constructing Observables from Other Sources

You can construct an Observable by converting existing JavaScript constructs like event listeners.  

For instance, say we have a button defined in our DOM as such:

```html
<button>Click Me!</button>
```

And we want `Clicked!` to be printed to console whenever the button is clicked. 
We can use `fromEvent` creation operator to create an Observable from the click event listener:

```js 
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

const clickStream = Observable.fromEvent(document.querySelector('button'), 'click');

const clickStreamSubscription = clickStream.subscribe(
  () => console.log('Clicked!')
);
```

Similarly to `fromEvent`, RxJS library provides [a number of different ways to create Observables](http://reactivex.io/rxjs/manual/overview.html#creation-operators) such as `fromPromise`.

---

## Disposing (Cancelling) Observable Execution

Say, for some reason, we want to the button to stop printing `Clicked!` to console after 3 seconds. 

We can achieve this by *disposing* or *cancelling* the Observable execution. This is done by *unsubscribing* from the executing Observable.

```js
const clickStreamSubscription = clickStream.subscribe(
  () => console.log('Click me!')
);

setTimeout(() => {
  clickStreamSubscription.unsubscribe(); 
}, 3000);
```

Notice that subscribing to the Observable returns a *Subscription* object. We can then use this Subscription object's 
`unsubscribe` method to dispose the Observable stream.

---

## Observable HTTP Events in Angular

One of the most common uses for Observables in Angular is to handle HTTP events:

```js 
http.get('http://jsonplaceholder.typicode.com/users/')
  .map((response) => Observable.from(response.json()))
  .subscribe((data) => {
    data.forEach(user => console.log(user.name));
  });
```

* `.map((data) => new Observable(data.json()))` transforms the `response` (response data) into a new Observable stream that emits `response` in a JSON object form.
* We can then work with to response data as a JSON object by subscribing to the newly transformed Observable stream.

---

## Observable Operations

Using *Observable operators* we can perform Array-like operations to filter and transform values as they are emitted by the Observable execution: 

```js
http.get('https://jsonplaceholder.typicode.com/users')
  .map((response) => Observable.from(response.json()))
  .subscribe((data) => {
    data  // data has been transformed to Observable via map()
      .filter((person) => person.id > 5)
      .map((person) => "Dr. " + person.name)
      .subscribe((doctor) => console.log(doctor)); 
  });
```

* `map`: for each emitted result of an Observable execution, apply the provided function and 
return a new `Observable` stream that emits the results. This is often used to *transform* each emitted value.
* `filter`: for each emitted result of an Observable execution, test it with "test" 
function and return a new `Observable` that emits only the results that *passed* the test.
* [See RxJS References](http://reactivex.io/rxjs/identifiers.html) for many more operators!

---

## Promise vs Observable: Chaining Promises vs `mergeMap`

Just as we can have nested Promises, we can have *nested Observables*. The previous slide contained an example of nested Observables. 

Promises can be *chained* to avoid nested Promises. Similarly, Observables can utilize `mergeMap` (also known as `flatMap`) to achieve something similar:

```js 
http.get('https://jsonplaceholder.typicode.com/users')
  .map((response) => Observable.from(response.json()))
  .mergeMap((data) => data)
  .filter((person) => person.id > 5)
  .map((person) => "Dr. " + person.name)
  .subscribe((doctor) => console.log(doctor));
```

`mergeMap` works by subscribing to and pulling values out of the inner Observable stream, which is `Observable.from(data)` in this example, and passing or *merging* them 
back to the outer Observable stream.

---

## Promise vs Observable: `Promise.all` vs `forkJoin`

One common scenario when working with Promises is resolving multiple promises together. This is commonly achieved using `Promise.all`.

The same can be achieved with Observables using `forkJoin` operator.

```js 
const users = http.get(
  'https://jsonplaceholder.typicode.com/users/'
).map((data) => data.json());
  
const posts = http.get(
  'https://jsonplaceholder.typicode.com/posts/'  
).map((data) => data.json());
  
Observable.forkJoin([users, posts])
  .subscribe((data) => {
    console.log(data[0]); // response for users
    console.log(data[1]); // response for posts
});
``` 
