<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="observables" -->
# Introduction to Observables

Objectives:

1. To be able to inject http into an Angular component, get a value from a typical REST endpoint and bind it directly to the template.

2. To be able to explain what the `async` pipe does and describe how you would mimic the behavior of the `async` pipe in a component by subscribing to an observable.

---
<!-- .slide: id="observables-what-are-observables" -->
## What are Observables?

* ECMA Stage 1, expected to move to Stage 2 soon.
* Available for use now via [RxJS library](https://github.com/ReactiveX/rxjs).
* Used in many languages and frameworks.
* Used extensively in Angular.
* Observables help with asynchronous behaviors.

---
<!-- .slide: id="observables-quiz-1" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

 An observable will:

1. two-way data bind a property
2. push notifications to an observer
3. let Angular know when change detection is required

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Definition from RxJS docs:

> The Observer and Observable interfaces provide a generalized
> mechanism for push-based notification, also known as the observer
> design pattern. The Observable object represents the object that
> sends notifications (the provider); the Observer object represents
> the class that receives them (the observer).

---
<!-- .slide: id="observables-subscribing" -->
## Subscribing to an Observable

Let's assume we have an observable, `getData$`. Here is how we tell it we want to log the value it will eventually emit:

```js

getData$.subscribe(data => {
  // when the getData$ observable fires, log the data
  console.log(data);
});

```

---
<!-- .slide: id="observables-quiz-2" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Subscribing to an observable:

1. returns another observable
2. allows you join multiple observables together
3. provides a callback to the observable
4. is not required in Angular

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 2.

---
<!-- .slide: id="observables-map-operator" -->
## The Map Operator

* You pass it a function that transforms (maps) the data returned.

For example: an observable based on an input event will pass the event object to the callback.  We can make it return the input's value using the `map` operator:

```ts
const searchString$ = Observable
  .fromEvent(document.querySelector('.search-input'), 'input')
  .map(event => {
    return event.target.value;
  });
```

Notes:
https://jsbin.com/genayadivo/edit?html,js,console,output
*concepts*: operators, map operator (instance method)

---
<!-- .slide: id="observables-quiz-3" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

The map operator:

1. will perform `Array.map` on the result of an observable when it is an array
2. will return an observable
3. enables geolocation in Angular
4. will modify the result returned by an observable

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 2.

---
<!-- .slide: id="observables-http-service" -->
## Angular's Http Service

* `Http` from `'@angular/http'` has methods such as `get` that return observables.
* Map is often used with `Http` as in the following example:

```ts
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
<!-- .slide: id="observables-unsubscribing" -->
## What about Unsubscribing?

* Observables that finish, including `http.get` don't need to be unsubscribed.
* Sometimes observables never finish.  An observable based on an event stream such as `searchString$` will keep calling the function we subscribe with every time it emits a value. We can stop this by unsubscribing from the observable.
* The `subscribe()` method returns a *subscription*.
* A subscription has an `unsubscribe()` method.

```ts
const clickStreamSubscription = clickStream.subscribe(
  () => console.log('clicked!')
);

setTimeout(() => {
  clickStreamSubscription.unsubscribe();
}, 3000);
```

---
<!-- .slide: id="observables-asyncpipe" -->
## Angular's AsyncPipe

* `AsyncPipe` helps us write less by taking an observable and:
  - subscribing to it
  - returning the returned value so it can be placed in your template
  - unsubscribing, when the value is no longer needed

Example (`name$` is an observable):

`<div> {{ name$ | async }} </div>`

---
<!-- .slide: id="observables-quiz-4" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Angular's `AsyncPipe`:

1. accepts an observable and binds the value to a template
2. gets data from a rest endpoint
3. makes asynchronous code look synchronous
4. can't be chained with pure pipes

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

---
<!-- .slide: id="observables-filter-operator" -->
## The Filter Operators

In addition to `map`, the `filter` operator is also available:

```ts
searchString$
  .filter(searchString => searchString.length > 3)
  .subscribe(value = console.log(value));
```

* 'filter' returns an observable and fires only when the value emitted from the observable has length greater than 3.
* [See RxJS References](http://reactivex.io/rxjs/identifiers.html) for many more operators!

---
<!-- .slide: id="observables-quiz-5" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Operators:

1. start execution of an observable when invoked
2. return subscriptions so you can unsubscribe
3. are methods on an observable that return an observable

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

The correct answer is 3.

---
<!-- .slide: id="observables-chaining-with-mergemap" -->
## Chaining Promises vs `mergeMap`

Observables can be nested.

Observables can utilize `mergeMap` (also known as `flatMap`) to combine more than one observable:

```ts
http.get('https://jsonplaceholder.typicode.com/users')
  .map((response) => Observable.from(response.json()))
  .mergeMap((data) => data)
  .filter((person) => person.id > 5)
  .map((person) => "Dr. " + person.name)
  .subscribe((doctor) => console.log(doctor));
```

`mergeMap` works by subscribing to and pulling values out of the inner Observable stream, which is `Observable.from(data)` in this example, and passing or *merging* them back to the outer Observable stream.

---
<!-- .slide: id="observables-combining-with-forkjoin" -->
## Combining multiple observables using `forkJoin`

We can resolve multiple observables together using the `forkJoin` operator.

```ts
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
