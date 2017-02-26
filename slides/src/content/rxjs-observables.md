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
  value => console.log(value),    // handles next
  error => console.log(error),    // handles error 
  () => console.log('complete'),  // handles complete
);
```

Subscribing to the Observable we created earlier would print:

```
1
2
complete
```

Also calling `subscribe` returns a *Subscription* object which is used to *dispose* or *cancel*
execution of an Observable.

---

## Disposing (Cancelling) Execution

Sometimes we want to cancel an `Observable`'s execution (*i.e.*, for an infinite sequence). We can
achieve this by *unsubscribing* from the executing Observable.

```js
const subscription = observable.subscribe(
  value => console.log(value),   
  error => console.log(error),    
  () => console.log('complete'),  
); 

subscription.unsubscribe(); // disposing observable execution
```

---

## Observables from Other (Angular) Sources

### Observable HTTP Events

```js 
http.get('http://jsonplaceholder.typicode.com/users/')
  .mergeMap((data) => data.json())
  .subscribe((data) => {
    this.doctors.push(data);
  });
```

### Observable Form Events 

```js
this.email = new FormControl();

this.email.valueChanges
  .map(n => n.split('').reverse().join(''))
  .subscribe(value => this.data = value);
```

---

## Observable Operations

```js
http.get('http://jsonplaceholder.typicode.com/users/')
  .mergeMap((response) => response.json())
  .filter((person) => person.id > 5)
  .map((person) => "Dr. " + person.name)
  .subscribe((data) => {
    this.doctors.push(data);
  });
```
* `mergeMap`: also known as `flatMap`, it is used to "flatten" result of an Observable
execution back into the Observable stream, allowing chaining operations like `filter` and 
`map`, which expects an `Observable`, to work.
* `filter`: for each emitted result of an Observable execution, test it with "test" 
function and return a new `Observable` that emits only the results that *passed* the test.
* `map`: for each emitted result of an Observable execution, apply the provided function and 
return a new `Observable` stream that emits the results.
* [See RxJS References](http://reactivex.io/rxjs/identifiers.html) for many more operators!
