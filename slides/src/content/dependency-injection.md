# Dependency Injection (DI)

---

## Angular 2 Dependency Injection
- Dependency injection (DI) is a programming concept that predates Angular.
- It is used to simplify dependency management in Angular by reducing the amount of information a component needs to know about its dependencies.
- DI enables more flexible codes and much easier testing process during development cycle.
- The tooling issues in Angular 1.x with respect to static analysis, minification and namespace collisions have been fixed in Angular 2.

---

## What is a DI _exactly_ ? (1/11)
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

## What is a DI _exactly_ ? (2/11)
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
## What is a DI _exactly_ ? (3/11)
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
## What is a DI _exactly_ ? (4/11)
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
## What is a DI _exactly_ ? (5/11)
This pattern in Typescript can be written as:
```ts
class ChatWidget {
  constructor(
    private authService: AuthService,
    private authWidget: AuthWidget,
    private chatSocket: ChatSocket
  ) {}
}
```
- This model of having the dependencies provided to `ChatWidget` is basic dependency injection.
- `ChatWidget` class is now simpler and easier to test.

But how DI constructs `ChatWidget`'s dependencies?

---
## What is a DI _exactly_ ? (6/11)
Naive first thought:
```ts
const chatWidget = new ChatWidget(
  new AuthService(['Google']),
  new AuthWidget('Normal'),
  new ChatSocket(true)
);
```
That's a lot of work to create a `ChatWidget`, and now all the different pieces of code that make `ChatWidget` have to understand how `AuthService`, `AuthWidget` and `ChatSocket` get instantiated.

---
## What is a DI _exactly_ ? (7/11)

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
## What is a DI _exactly_ ? (8/11)

How DI does:
```ts
const injector = new Injector([
  ChatWidget,
  AuthService,
  AuthWidget,
  ChatSocket]);
const chatApp = injector.get(ChatWidget);
```
- An `Injector` is a lot like the previous factory function, but more general, and powerful.
- Instead of one giant factory function, an `Injector` has a factory, or recipe for a collection of objects.

---
## What is a DI _exactly_ ? (9/11)

How about Angular 2's DI?
- Compared to the `Injector` example, Angular 2 simplifies DI even further.
- Angular 2's DI system is (mostly) controlled through `@NgModule`.
- Specifically the `declarations` and `providers` array: `declarations` is where we put components, pipes and directives; `providers` is where we put services.

---
## What is a DI _exactly_ ? (10/11)

For example:

```ts
@Component({...})
class ChatWidget {
  constructor(
    private authService: AuthService,
    private authWidget: AuthWidget,
    private chatSocket: ChatSocket
  ) {}
}
@NgModule({
  declarations: [ ChatWidget ],
})
export class AppModule {};
```
- The `AppModule` is told about the `ChatWidget` through `declarations`.
- Angular 2 assumes that `ChatWidget` is a class.
- How does Angular know about `AuthService`, `AuthWidget` and `ChatSocket`?

---
## What is a DI _exactly_ ? (11/11)

Revised version:
```ts
@Component({...})
class ChatWidget {
  constructor(private authService: AuthService, private authWidget:
    AuthWidget, private chatSocket: ChatSocket) {}
}
@Component({...})
class AuthWidget {}
@Injectable()
class AuthService {}
@Injectable()
class ChatSocket {}
@NgModule({
  declarations: [ ChatWidget, AuthWidget ]
  providers: [ AuthService, ChatSocket ],
})
export class AppModule {};
```

---
##`@Inject`, `@Injectable`

- `@Inject` and `@Injectable` are [decorators](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript).
- `@Inject()` is a manual mechanism for letting Angular 2 know that a parameter must be injected.
- `@Injectable()` lets Angular 2 know that a class can be used with the dependency injector.
- `@Injectable()` is not _strictly_ required if the class does not have any dependencies.

---
##How `@Inject` Works
`@Inject` example:
```ts
...
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
##How `@Inject` Works

In TypeScript, `@Inject` is only needed for injecting primitives. TypeScript's types let Angular 2 know what to do in most cases.
```ts
...
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
So `@Inject(ChatWidget) chatWidget` can actually be replaced by `chatWidget: ChatWidget`.

---
##How `@Injectable` Works

`@Injectable()` example:
```ts
@Injectable()
export class ChatWidget {
  constructor(public authService: AuthService, public authWidget:
    AuthWidget, public chatSocket: ChatSocket) {}
}
```
- `@Injectable()` lets Angular 2 know that class `ChatWidget` can be used with the dependency injector.
- But, for components, if we have used `@Component` decorator, we can ignore `@Injectable`:
```ts
@Component({...})
export class ChatWidget {
  constructor(public authService: AuthService, public authWidget:
    AuthWidget, public chatSocket: ChatSocket) {}
}
```

---
##Injection Beyond Classes (1/4)
How about primitives dependencies? and how does injection help testing?
- Angular 2 is not limited to injecting classes.
- Angular 2 lets programmers specify providers with a more verbose "recipe" in `providers`:

```ts
@NgModule({
  providers: [ { provide: AuthService, useClass: AuthService } ],
})
export class AppModule {};
```
- Besides `useClass`, Angular also provides `useValue`, `useFactory`.

---
##Injection Beyond Classes (2/4)
`useClass` example:
```ts
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth-service';
import { MockAuthService } from './services/mock-auth-service';

@NgModule({
  providers: [ { provide: AuthService, useClass: MockAuthService } ],
})
export class AppModule {};
```
- In `AppModule`, declarations of type `AuthService` will actually use `MockAuthService`'s definition.
- Best part: the injection system knows how to build `MockAuthService`, and will not get developers bogged down.
- Also enables easy and neat testing process.

---
##Injection Beyond Classes (3/4)
`useFactory` example:
```ts
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

const randomFactory = () => { return Math.random(); };

@NgModule({
  providers: [ { provide: 'Random', useFactory: randomFactory } ],
})
export class AppModule {};
```
- With `useFactory`, Angular 2 expects the provided value to be a function.
- In this example, Angular 2 use `randomFactory` to produce `Random` during injection process which means `Random` is the return value of `randomFactory` not `randomFactory` itself.

---
##Injection Beyond Classes (4/4)
`useValue` example:
```ts
import { NgModule } from '@angular/core';
import { App } from './containers/app'; // hypothetical app component

@NgModule({
  providers: [ { provide: 'Random', useValue: Math.random() } ],
})
export class AppModule {};
```
- `useValue` is used to provide static value.
- In this example, the product of `Math.random` is assigned to `Random`.

---
##The Injector Tree (1/4)
How injector gets handled then?
- In Angular 1.x, there is only one injector per application, but in Angular 2, there is a [tree of injectors](content/images/di.png).
- The injector tree does not make a new injector for every component, but does make a new injector for every component with a `providers` array in its decorator.
- Components that have no `providers` array look to their parent component for an injector. If the parent does not have an injector, it looks up until it reaches the root injector.

---
##The Injector Tree (2/4)
_Warning_: If a child component is decorated with a providers array that contains dependencies that were also requested in the parent component(s), the dependencies the child receives will shadow the parent dependencies. This can have all sorts of unintended consequences.

To illustrate this, assume we have a service that should be kept as a singleton:
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class Unique {
  value: string;

  constructor() {
    this.value = (+Date.now()).toString(16) + '.' +
      Math.floor(Math.random() * 500);
  }
}
```

---
##The Injector Tree (3/4)
```ts
@Component({
  selector: "app",
  template: `
    <p>App's Unique dependency has a value of {{ u.value }}</p>
    <p>which should match <child-inheritor></child-inheritor></p>
  `
})
export class App { constructor(public u: Unique) {} }
```
```ts
@Component({
  selector: "child-inheritor",
  template: `{{u.value}}`,
  providers: [Unique]
})
export class ChildInheritor { constructor(u: Unique) {} }
```
The expectation is that `ChildInheritor` should have same `Unique` instance as `App`,
but it turns out that in this case, _different_ `Unique` instances would be assigned to these two components.

---
##The Injector Tree (4/4)
Why? Let's check the injector tree in this case:
<p align="center">
  <img src="content/images/injector-tree-diagram.png"/>
</p>
- `App` gets `Unique` from root injector.
- `ChildInheritor` gets `Unique` from ChildInheritor injector.
