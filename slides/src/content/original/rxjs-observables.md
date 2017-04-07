# Introduction to Observables

Notes:
Objectives:
1. To be able to inject http into an Angular component, get a value from a typical REST endpoint and bind it directly to the template.
2. To be able to explain what the `async` pipe does and describe how you would mimic the behaviour of the `async` pipe in a component by subscribing to an observable.

---

## What are Observables?

* ECMA Stage 1, expected to move to Stage 2 soon.
* Available for use now via [RxJS library](https://github.com/ReactiveX/rxjs).
* Used in many languages and frameworks.
* Used extensively in Angular.
* Observables help with asynchronous behaviours.

+++

## Quiz 1

1. An observable will:
  1. two-way data bind a property
  2. push notifications to an observer
  3. let angular know when change detetection is requried

+++

## Definition from rxjs docs

> The Observer and Observable interfaces provide a generalized mechanism for push-based notification, also known as the observer design pattern. The Observable object represents the object that sends notifications (the provider); the Observer object represents the class that receives them (the observer).

---

## Subscribing to an Observable

Let's assume we have an observable, `getData$`. Here is how we tell it we want to log the value it will eventually emit: 

```javascript

getData$.subscribe(data => {
  // when the getData$ observable fires, log the data
  console.log(data);
});

```

Notes:
*concepts*: Observable, subscribe method, callback function

+++

## Quiz 2

2. Subscribing to an observable
  1. returns another observable
  2. allows you join multiple observables together
  3. provides a callback to the observable
  4. is not required in Angular

---

## The Map Operator

* You pass it a function that transforms (maps) the data returned.

For example: an observable based on an input event will pass the event object to the callback.  We can make it return the input's value using the `map` operator:

```javascript
const searchString$ = Observable
  .fromEvent(document.querySelector('.search-input'), 'input')
  .map(event => {
    return event.target.value;
  });
```

Notes:
https://jsbin.com/genayadivo/edit?html,js,console,output
*concepts*: operators, map operator (instance method)

+++

## Quiz 3

3. The map operator
  1. will perform `Array.map` on the result of an observable, only when it is an array.
  2. will return an observable
  3. enables geolocation in Angular
  4. will modify the result returned by an observable

---

## Angular's Http Service

* `Http` from `'@angular/http'` has methods such as `get` that return observables.
* Map is often used with `Http` as in the following example:

```javascript
const getData$ = http.get('https://example.com/api/products')
.map(response => {
  return response.json();
});
getData$.subscribe((data) => {
  // 
});
```

In this example, `map` is used because `get` is an observable of an object with a `json` method.  Usually, we want the return value of `json()`, not the response object!

---

## What about Unsubscribing?

* Observables that finish, including `http.get` don't need to be unsubscribed.
* Sometimes observables never finish.  An observable based on an event stream such as `searchString$` will keep calling the function we subscribe with every time it emits a value. We can stop this by unsubscribing from the observable.
* The `subscribe()` method returns a *subscription*.
* A subscription has an `unsubscribe()` method.

```js
const clickStreamSubscription = clickStream.subscribe(
  () => console.log('clicked!')
);

setTimeout(() => {
  clickStreamSubscription.unsubscribe(); 
}, 3000);
```

Notes:
*concept*: subscription, unsubscribe method

---

## Angular's AsyncPipe

* The `AsyncPipe` helps us write less by taking an observable and:
  - subscribing to it
  - returning the returned value so it can be placed in your template
  - unsubscibing, when the value is no longer needed

Example (`name$` is an observable):

`<div> {{ name$ | async }} </div>`

+++

## Quiz 4

Angular's `AsyncPipe`
  1. accepts an observable and binds the value to a template
  2. gets data from a rest endpoint
  3. makes async code look procedural
  4. can't be chained with pure pipes


---

## The Filter Operators

In addition to `map`, the `filter` operator is also available: 

```js
searchString$
  .filter(searchString => searchString.length > 3)
  .subscribe(value = console.log(value));
```

* 'filter' returns an observable and fires only when the value emitted from the observable has length greater than 3.
* [See RxJS References](http://reactivex.io/rxjs/identifiers.html) for many more operators!

+++

## Quiz 5

Operators:
  1. Start execution of an observable when invoked
  2. Return subscriptions so you can unsubscribe
  3. Are methods on an observable that return an observable

---

## Chaining Promises vs `mergeMap`

Observables can be nested.

Observables can utilize `mergeMap` (also known as `flatMap`) to combine more than one observable:

```js 
http.get('https://jsonplaceholder.typicode.com/users')
  .map((response) => Observable.from(response.json()))
  .mergeMap((data) => data)
  .filter((person) => person.id > 5)
  .map((person) => "Dr. " + person.name)
  .subscribe((doctor) => console.log(doctor));
```

`mergeMap` works by subscribing to and pulling values out of the inner Observable stream, which is `Observable.from(data)` in this example, and passing or *merging* them back to the outer Observable stream.

---

## Combining multiple observables using `forkJoin`

We can resolve multiple observables together using the `forkJoin` operator.

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
