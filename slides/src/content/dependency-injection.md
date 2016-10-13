# Dependency Injection (DI)

---

## Angular 2 Dependency Injection
- Dependency injection (DI) is a programming concept that predates Angular.
- It is used to simplify dependency management in Angular by reducing the amount of information a component needs to know about its dependencies.
- DI enables more flexible codes and much easier testing process during development cycle.
- The tooling issues in Angular 1.x with respect to static analysis, minification and namespace collisions have been fixed in Angular 2.

---

## What is a DI _exactly_ ?
Consider the following code:
```ts
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor() {
    this.authService = new AuthService(['Facebook', 'Google', 'Github']);
    //Create a normal size auth widget
    this.authWidget = new AuthWidget('Normal');
    //Create a chat socket with encryption
    this.chatSocket = new ChatSocket(true);
  }
}
```
- `ChatWidget` consists of a `AuthService`, `AuthWidget` and `ChatSocket`.
- `ChatWidget` is also responsible for making all its dependencies.

---

What if we need a chat widget that accepts `Linkedin`?

One naive approach might be:
```ts
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor() {
    this.authService = new AuthService(['Linkedin', 'Facebook', 'Google',
    'Github']);
    this.authWidget = new AuthWidget('Normal');
    this.chatSocket = new ChatSocket(true);
  }
}
```
But what if we need a smaller auth widget? or we want to turn off encryption?

---
So, maybe something more generic like:
```ts
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor(authServiceType: string[], authWidgetSize: string,
    chatSocketEncryption: boolean) {
    this.authService = new AuthService(authServiceType);
    this.authWidget = new AuthWidget(authWidgetSize);
    this.chatSocket = new ChatSocket(chatSocketEncryption);
  }
}
```
- Still brittle, because `ChatWidget` still needs to know the construction details of its dependencies.
- Changes on any constructor of `ChatWidget`'s dependencies would also require a change on `ChatWidget`'s constructor.

---
Further optimize the code:
```ts
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;
  constructor(authService: AuthService, authWidget: AuthWidget,
    chatSocket: ChatSocket) {
    this.authService = authService;
    this.authWidget = authWidget;
    this.chatSocket = chatSocket;
  }
}
```
- `ChatWidget` has no knowledge about how to construct its dependencies.
- Changes on its dependencies' constructor does not effect `ChatWidget`'s constructor.

---
This pattern in Typescript can be written as:
```ts
class ChatWidget {
  constructor(private authService: AuthService, private authWidget:
    AuthWidget, private chatSocket: ChatSocket) {}
}
```
- This model of having the dependencies provided to `ChatWidget` is basic dependency injection.
- `ChatWidget` class is now simpler and easier to test.

But how DI constructs `ChatWidget`'s dependencies?

---
Naive first thought:
```ts
const chatWidget = new ChatWidget(new AuthService(['Google']), new
  AuthWidget('Normal'), new ChatSocket(true));
```
That's a lot of work to create a `ChatWidget`, and now all the different pieces of code that make `ChatWidget` have to understand how `AuthService`, `AuthWidget` and `ChatSocket` get instantiated.

---
`Factory` approach:
```ts
function chatWidgetFactory() {
    const authService = new AuthService(['Google']);
    const authWidget = new AuthWidget('Normal');
    const chatSocket = new ChatSocket(true);
    return new ChatWidget(authService, authWidget, chatSocket);
}
```
- An improvement. But when the `ChatWidget` gets more complex, this factory will become confusing.
- The factory is also responsible for knowing how to create four different components, which is a lot for one function.

---
How DI does:
```ts
const injector = new Injector([ChatWidget, AuthService, AuthWidget,
  ChatSocket]);
const chatApp = injector.get(ChatWidget);
```
- An `Injector` is a lot like the previous factory function, but more general, and powerful.
- Instead of one giant factory function, an `Injector` has a factory, or recipe (pun intended) for a collection of objects.

---
How about Angular 2's DI?
- Compared to the `Injector` example, Angular 2 simplifies DI even further.
- Angular 2's DI system is (mostly) controlled through `@NgModule`. Specifically the `providers` array.

---
For example:

```ts
import { Injectable, NgModule } from '@angular/core';

@Injectable()
class ChatWidget {
  constructor(private authService: AuthService, private authWidget:
    AuthWidget, private chatSocket: ChatSocket) {}
}

@NgModule({
  providers: [ ChatWidget ],
})
export class DiExample {};
```
- The `DiExample` module is told about the `ChatWidget` through `providers`.
- Angular 2 assumes that `ChatWidget` is a class.
- How Angular knows `AuthService`, `AuthWidget` and `ChatSocket`?

---
Revised version:
```ts
import { Injectable, NgModule } from '@angular/core';
@Injectable()
class ChatWidget {
  constructor(private authService: AuthService, private authWidget:
    AuthWidget, private chatSocket: ChatSocket) {}
}
@Injectable()
class AuthService {}
@Injectable()
class AuthWidget {}
@Injectable()
class ChatSocket {}
@NgModule({
  providers: [ ChatWidget, AuthService, AuthWidget, ChatSocket ],
})
```
So, in Angular's injection system, how `ChatWidget` gets its dependencies?

---
##`@Inject`, `@Injectable`:

- `@Inject` and `@Injectable` are [decorators](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript).
- `@Inject()` is a manual mechanism for letting Angular 2 know that a parameter must be injected.
- `@Injectable()` lets Angular 2 know that a class can be used with the dependency injector.
- `@Injectable()` is not _strictly_ required if the class has other Angular 2 decorators on it or does not have any dependencies.

---
`@Inject` [example](https://plnkr.co/edit/lbRrkR03ecXecvulcsV8?p=preview):
```ts
import { Component, Inject } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';
@Component({
  selector: 'app',
  template: `Encryption: {{ encryption }}`
})
export class App {
  encryption: boolean;
  constructor(@Inject(ChatWidget) chatWidget) {
    this.encryption = chatWidget.chatSocket.encryption;
  }
}
```
- `@Inject(ChatWidget)` tells the variable `chatWidget` should be associated with the class `ChatWidget`.
-  `ChatWidget` here is only used for typings not instantiating, Angular does that for us behind the scenes.

---

In TypeScript, `@Inject` is only needed for injecting primitives. TypeScript's types let Angular 2 know what to do in most cases.
```ts
import { Component } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';

@Component({
  selector: 'app',
  template: `Encryption: {{ encryption }}`
})
export class App {
  encryption: boolean;
  constructor(chatWidget: ChatWidget) {
    this.encryption = chatWidget.chatSocket.encryption;
  }
}
```

---
`@Injectable()` [example](https://plnkr.co/edit/lbRrkR03ecXecvulcsV8?p=preview)
```ts
import {Injectable} from '@angular/core';
import {AuthService} from './auth-service';
import {AuthWidget} from './auth-widget';
import {ChatSocket} from './chat-socket';

@Injectable()
export class ChatWidget {
  constructor(public authService: AuthService, public authWidget:
    AuthWidget, public chatSocket: ChatSocket) {
  }
}
```
- `@Injectable()` lets Angular 2 know that class `ChatWidget` can be used with the dependency injector.
- Here, Angular 2 uses types again to decide what to do regarding to `ChatWidget`'s dependencies.

---
##Injection Beyond Classes
How about primitives dependencies? and how does injection help testing?
- Angular 2 is not limited to injecting classes.
- Angular 2 lets programmers specify providers with a more verbose "recipe" in `providers`:

```ts
@NgModule({
  providers: [ { provide: ChatWidget, useClass: ChatWidget } ],
})
export class DiExample {};
```
- Besides `useClass`, Angular also provides `useValue`, `useFactory`.

---
`useClass` example:
```ts
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component
import { ChatWidget } from './components/chat-widget';
import { MockChatWidget } from './components/mock-chat-widget';

@NgModule({
  providers: [ { provide: ChatWidget, useClass: MockChatWidget } ],
})
export class DiExample {};
```
- In `DiExample` module, declarations of type `ChatWidget` will actually use `MockChatWidget`'s definition.
- Best part: the injection system knows how to build `MockChatWidget`, and will not get developers bogged down.
- Also enables easy and neat testing process.

---
`useFactory` [example](http://plnkr.co/edit/Dkm0cJF80EdmPcWZx45W?p=preview):
```ts
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

const randomFactory = () => { return Math.random(); };

@NgModule({
  providers: [ { provide: 'Random', useFactory: randomFactory } ],
})
export class DiExample {};
```
- With `useFactory`, Angular 2 expects the provided value to be a function.
- In this example, Angular 2 use `randomFactory` to produce `Random` during injection process.

---
`useValue` [example](http://plnkr.co/edit/63GsCDOElY7J8LNAbTjL?p=preview)
```ts
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

@NgModule({
  providers: [ { provide: 'Random', useValue: Math.random() } ],
})
export class DiExample {};
```
- `useValue` is used to provide static value.
- In this example, the product of `Math.random` is assigned to `Random`.

---
##The Injector Tree
How injector gets handled then?
- In Angular 1.x, there is only one injector per application, but in Angular 2, there is a [tree of injectors](content/images/di.png).
- The injector tree does not make a new injector for every component, but does make a new injector for every component with a `providers` array in its decorator.
- Components that have no `providers` array look to their parent component for an injector. If the parent does not have an injector, it looks up until it reaches the root injector.

---
- _Warning_: If a child component is decorated with a providers array that contains dependencies that were also requested in the parent component(s), the dependencies the child receives will shadow the parent dependencies. This can have all sorts of unintended consequences. There is one [example](http://plnkr.co/edit/5jHB4TP3IpnkWJq2wzeX?p=preview).
