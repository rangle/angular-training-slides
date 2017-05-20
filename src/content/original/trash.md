## The Root Component

_app/app.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Basic Angular 2 Application</h1>
    <p>Hello World</p>
  `,
  styles: [`
    p { 
      color: red;
    }
  `]
})
export class AppComponent {}
```

Notes:

- It's a good practice to prefix the selector name (`rio-`)
- We can define an external template with the `templateUrl` property
- We can define an external css file for the component with the `styleUrl` property
- Styles apply only to the component similar to shadow root
- We can define other encapsulation modes using the `encapsulation` property

---


# Interpolation

---

## Using Properties, Methods and Statements

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Interpolation</h1>
    <p>Property: {{ message }}</p>
    <p>Method: {{ getMessage() }}</p>
    <p>Statement: {{ 3 + 4 }}</p>
  `
})
export class AppComponent {
  message = 'Message from property';
  getMessage() {
    return 'Message from method';
  }
}
```

[View Example](http://localhost:4200/examples/2.0-interpolation/index.html)

Notes:

- JS statements can also be interpolated
- Public and private properties/methods can be used
- It is a good practice to define as "public" any property/method used in the template 

---

# Events

---

## The (click) Event

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Events</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <p>{{ counter }}</p>`
})
export class AppComponent {
  counter = 0;
  increment() { this.counter += 1 }
  decrement() { this.counter -= 1 }
}
```

Notes:

- Events allow flow of data from the template to the class
- Events use the special syntax ()
- Any standard event can be used: mouseover, mouseleave, keydown, etc
- We can pass the special object $event to get more info
- We can create our own custom events

---

# Structural Directives

---

## ngIf

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleVisibility()">{{ label }}</button>
    <p *ngIf="isVisible">Am I visible?</p>`
})
export class AppComponent {
  label = 'Hide';
  isVisible = true;

  toggleVisibility() {
    if (this.isVisible) {
      this.isVisible = false;
      this.label = 'Show';
    } else {
      this.isVisible = true;
      this.label = 'Hide';
    }
  };
}
```

---

## ngFor

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ol>
      <li *ngFor="let item of list">
        <span>({{ item.id }})</span>
        <span>{{ item.value }}</span>
      </li>
    </ol>
  `
})
export class AppComponent {
  list = [
    { id: 0, value: 'zero the hero' },
    { id: 1, value: 'first the worst' },
    { id: 2, value: 'second the best' }
  ];
}
```

---

# Attribute Directives

---

## ngClass

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleVisibility()">{{ label }}</button>
    <p [ngClass]="{ hidden: !isVisible }">Am I visible?</p>
  `,
  styles: [`
    .hidden { 
      display: none; 
    }
  `]
})
export class AppComponent {
  ...
}
```

[View Example](http://localhost:4200/examples/4.1-ng-if/index.html)

---

# Services

---

## Using Services to Get Data

_app.component.ts_

```ts
import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';

@Component({
  selector: 'app-root',
  template: `
    <ol>
      <li *ngFor="let item of list">
        <span>({{ item.id }})</span>
        <span>{{ item.value }}</span>
      </li>
    </ol>`
})
export class AppComponent implements OnInit {
  list = [];
  constructor(private listService: ListService) {}
  ngOnInit() {
    this.list = this.listService.getList();
  }
}
```

---

## Service Definition

_list.service.ts_

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class ListService {
  getList() {
    return [
      { id: 0, value: 'zero the hero' },
      { id: 1, value: 'first the worst' },
      { id: 2, value: 'second the best' }
    ];
  }
}
```

---

## Registering a Service in a Module

_app.module.ts_

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListService } from './list.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

# Component Tree

---

## Nesting a Component

_app.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Component Tree</h1>
    <p>Root Component</p>
    <rio-message></rio-message>`
})
export class AppComponent {}
```

---

## The Child Component

_message.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-message',
  template: '<p>I have a message for you</p>'
})
export class MessageComponent {}
```

---

## Declaring the Components in the Module

_app.module.ts_

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    MessageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

# Exercise

---

# Bindings

---

## Unidirectional Data Flow

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Bindings</h1>
    <div>
      Configurable Input:
      <input [type]="inputType" [value]="label">
    </div>
    <div>
      Label The Input:
      <input type="text" (change)="changeLabel($event)">
      Change The Input:
      <select (change)="changeType($event)">
        <option value="text" selected>text</option> 
        <option value="password">password</option> 
        <option value="button">button</option> 
      </select>
    </div>
`,
})
export class AppComponent {
  inputType: string = 'text';
  label: string = 'configurable';

  changeLabel(event) {
    this.label = event.target.value;
  }

  changeType(event) {
    this.inputType = event.target.value;
  }
}
```

[View Example](http://localhost:4200/examples/7.0-bindings/index.html)

---

# Inputs

---

## Passing Values to Nested Components

```ts
import {Component} from '@angular/core';
export {CustomComponent} from './custom.component';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Components with Inputs</h1>
    <rio-custom value="Hello World!"></rio-custom>
  `,
})
export class AppComponent {}
```

---

## Capturing Values with @Input

```ts
import {Component, Input} from '@angular/core';

@Component({
  selector: 'rio-custom',
  template: '{{ value }}',
})
export class CustomComponent {
  @Input() value;
}
```

[View Example](http://localhost:4200/examples/8.0-inputs/index.html)

---

# Output

---

## Listening to Custom Events

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Outputs</h1>
    <rio-clickable (action)="onAction($event)"></rio-clickable>
    <span>{{ output }}</span>
  `
})
export class AppComponent {
  output: string = '';
  onAction(data) {
      this.output += data + ' ';
  }
}
```

---

## Defining Custom Events with @Output

```ts
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'rio-clickable',
  template: `
    <button (click)="action.emit(text)">Click</button>
    <input type="text" [value]="text" (change)="changeText($event)">
  `,
})
export class ClickableComponent {
  @Output() action = new EventEmitter<string>();
  text: string = '';
  changeText(event) {
    this.text = event.target.value;
  }
}
```

[View Example](http://localhost:4200/examples/9.0-outputs/index.html)

---

# Two Way Data Bindings

---

## The "Banana in a Box" Syntax

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Two Way Data Binding</h1>
    <rio-child [(value)]="parentValue"></rio-child>
    <div>Parent Value: {{ parentValue }}</div>
`,
})
export class AppComponent {
  parentValue: string = 'two way binding';
}
```

---

## Child Component

```ts
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rio-child',
  template: `
    <input [value]="value" 
      (keyup)="valueChange.emit($event.target.value)"> 
  `,
})
export class ChildComponent {
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
```

[View Example](http://localhost:4200/examples/10.0-two-way-binding/index.html)

---



#Components

---

## Components In Angular 2

- The core concept of any Angular 2 application is the component.
- In effect, the whole application can be modeled as a tree of these components.
- A component controls a patch of screen real estate that we could call a view, and declares reusable UI building blocks for an application.

---

## Creating Components

Components in Angular 2 build upon this idea. We define a component's application logic inside a class. To this we then attach a selector and a template.
- selector is the element property that we use to tell Angular to create and insert an instance of this component.
- template is a form of HTML that tells Angular how to render this component.

```ts
import {Component} from '@angular/core';

@Component({
    selector: 'hello',
    template: '<p>Hello, {{name}}</p>'
})
export class Hello {
  name: string;

  constructor() {
    this.name = 'World';
  }
}
```

To use this component we simply add <hello></hello> to our HTML: [View Example](http://plnkr.co/edit/LmsR4psbJZwXH0c4lpMa?p=preview)

---

## Application Structure with Components

A useful way of conceptualizing Angular application design is to look at it as a tree of nested components, each having an isolated scope.

```html
<TodoApp>
  <TodoList>
    <TodoItem></TodoItem>
    <TodoItem></TodoItem>
    <TodoItem></TodoItem>
  </TodoList>
  <TodoForm></TodoForm>
</TodoApp>
```

---

# Dependency Injection (DI)

---

## Angular 2 Dependency Injection

- Dependency injection (DI) is a programming concept that predates Angular.
- It is used to simplify dependency management in Angular by reducing the amount of information a component needs to know about its dependencies.
- DI enables more flexible codes and much easier testing process during development cycle.
- The tooling issues in Angular 1.x with respect to static analysis, minification and namespace collisions have been fixed in Angular 2.

---

## What's DI? (1/11)

Consider the following code:

```ts
class ChatWidget {
  private authService: AuthService;
  private authWidget: AuthWidget;
  private chatSocket: ChatSocket;

  constructor() {
    // Create an authentication service with multiple providers
    this.authService = new AuthService(['Facebook', 'Google', 'Github']);
    // Create a normal size auth widget
    this.authWidget = new AuthWidget('Normal');
    // Create a chat socket with encryption
    this.chatSocket = new ChatSocket(true);
  }
}
```

- `ChatWidget` consists of `AuthService`, `AuthWidget` and `ChatSocket`.
- `ChatWidget` is also responsible for making all its dependencies.

---

## What's DI? (2/11)

What if we need a chat widget that accepts `Linkedin`?

One naive approach might be:

```ts
class ChatWidget {
  ...
  constructor() {
    this.authService = new AuthService(
      ['Linkedin', 'Facebook', 'Google', 'Github']
    );
    this.authWidget = new AuthWidget('Normal');
    this.chatSocket = new ChatSocket(true);
  }
}
```

But what if we need a smaller auth widget? or we want to turn off encryption?

---

## What's DI? (3/11)

So, maybe something more generic like:

```ts
class ChatWidget {
  ...
  constructor(
    authServiceType: string[], 
    authWidgetSize: string,
    chatSocketEncryption: boolean
  ) {
    this.authService = new AuthService(authServiceType);
    this.authWidget = new AuthWidget(authWidgetSize);
    this.chatSocket = new ChatSocket(chatSocketEncryption);
  }
}
```

- Still brittle, because `ChatWidget` still needs to know the construction details of its dependencies.
- Changes on any constructor of `ChatWidget`'s dependencies would also require a change on `ChatWidget`'s constructor.

---

## What's DI? (4/11)

Further optimize the code:

```ts
class ChatWidget {
  ...
  constructor(
    authService: AuthService, 
    authWidget: AuthWidget,
    chatSocket: ChatSocket
  ) {
    this.authService = authService;
    this.authWidget = authWidget;
    this.chatSocket = chatSocket;
  }
}
```

- `ChatWidget` has no knowledge about how to construct its dependencies.
- Changes on its dependencies' constructor does not effect `ChatWidget`'s constructor.

---

## What's DI? (5/11)

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

## What's DI? (6/11)

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

## What's DI? (7/11)

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

## What's DI? (8/11)

How DI does:

```ts
const injector = new Injector([
  ChatWidget,
  AuthService,
  AuthWidget,
  ChatSocket
]);

const chatApp = injector.get(ChatWidget);
```

- An `Injector` is a lot like the previous factory function, but more general, and powerful.
- Instead of one giant factory function, an `Injector` has a factory, or recipe for a collection of objects.

---

## What's DI? (9/11)

How about Angular 2's DI?

- Compared to the `Injector` example, Angular 2 simplifies DI even further.
- Angular 2's DI system is (mostly) controlled through `@NgModule`.
- Specifically the `declarations` and `providers` array: `declarations` is where we put components, pipes and directives; `providers` is where we put services.

---

## What's DI? (10/11)

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
```

```ts
@NgModule({
  declarations: [ ChatWidget ],
  ...
})
export class AppModule {};
```

- The `AppModule` is told about the `ChatWidget` through `declarations`.
- Angular 2 assumes that `ChatWidget` is a class.
- How does Angular know about `AuthService`, `AuthWidget` and `ChatSocket`?

---

## What's DI? (11/11)

Revised version:

```ts
@Component({ ... })
class ChatWidget {
  constructor(
    private authService: AuthService, 
    private authWidget: AuthWidget, 
    private chatSocket: ChatSocket) {}
}
```

```ts
@Component({ ... })
class AuthWidget {}
```

```ts
@Injectable()
class AuthService {}
```

```ts
@Injectable()
class ChatSocket {}
```

```ts
@NgModule({
  declarations: [ ChatWidget, AuthWidget ]
  providers: [ AuthService, ChatSocket ],
})
export class AppModule {};
```

---

## @Inject and @Injectable

- `@Inject` and `@Injectable` are [decorators](http://blog.wolksoftware.com/decorators-reflection-javascript-typescript).
- `@Inject()` is a manual mechanism for letting Angular 2 know that a parameter must be injected.
- `@Injectable()` lets Angular 2 know that a class can be used with the dependency injector.
- `@Injectable()` is not _strictly_ required if the class does not have any dependencies.

---

## How @Inject Works

```ts
@Component({
  selector: 'app',
  template: 'Encryption: {{ encryption }}'
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

[View Example](https://plnkr.co/edit/lbRrkR03ecXecvulcsV8?p=preview)

---

## How @Inject Works

In TypeScript, `@Inject` is only needed for injecting primitives. TypeScript's types let Angular 2 know what to do in most cases.

```ts
...
@Component({
  selector: 'app',
  template: 'Encryption: {{ encryption }}'
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

## How @Injectable Works

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

[View Example](https://plnkr.co/edit/lbRrkR03ecXecvulcsV8?p=preview)

---

## Injection Beyond Classes (1/4) - useClass

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

## Injection Beyond Classes (2/4) - Mocks

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

## Injection Beyond Classes (3/4) - useFactory

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

[View Example](http://plnkr.co/edit/Dkm0cJF80EdmPcWZx45W?p=preview)

---

## Injection Beyond Classes (4/4) - useValue

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

[View Example](http://plnkr.co/edit/63GsCDOElY7J8LNAbTjL?p=preview)

---

## The Injector Tree (1/4)

How injector gets handled then?

- In Angular 1.x, there is only one injector per application, but in Angular 2, there is a [tree of injectors](content/images/di.png).
- The injector tree does not make a new injector for every component, but does make a new injector for every component with a `providers` array in its decorator.
- Components that have no `providers` array look to their parent component for an injector. If the parent does not have an injector, it looks up until it reaches the root injector.

---

## The Injector Tree (2/4)

**Warning**: If a child component is decorated with a providers array that contains dependencies that were also requested in the parent component(s), the dependencies the child receives will shadow the parent dependencies. This can have all sorts of unintended consequences.

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

## The Injector Tree (3/4)

```ts
@Component({
  selector: 'app',
  template: `
    <p>App's Unique dependency has a value of {{ u.value }}</p>
    <p>which should match <child-inheritor></child-inheritor></p>
  `
})
export class App { constructor(public u: Unique) {} }
```

```ts
@Component({
  selector: 'child-inheritor',
  template: '{{ u.value }}',
  providers: [Unique]
})
export class ChildInheritor { constructor(u: Unique) {} }
```

The expectation is that `ChildInheritor` should have same `Unique` instance as `App`,
but it turns out that in this case, _different_ `Unique` instances would be assigned to these two components.

---

## The Injector Tree (4/4)

Why? Let's check the injector tree in this case:

![DI Tree](content/images/injector-tree-diagram.png)

- `App` gets `Unique` from root injector.
- `ChildInheritor` gets `Unique` from ChildInheritor injector.