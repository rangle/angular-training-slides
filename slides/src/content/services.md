# Services and Dependency Injection

---

## Angular 2 Services

- Not all logic belongs in a component - some things, like requests for data or authentication, should be refactored into a service
- Services are like subsystems in your application that can operate independantly and be used by many different components (See: [Service Oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture))
- In Angular 2, a service is a class that parts of the app will use as a dependency

---

## Angular 2 Dependency Injection

- Dependency injection (DI) is a programming concept that predates Angular.
- It is used to simplify dependency management in Angular by reducing the amount of information a component needs to know about its dependencies.
- DI enables more flexible codes and much easier testing process during development cycle.
- In the real world, DI will mainly be seen when we provide a service to a component.

---

## Creating a Service

- Services are classes that are decorated with the `@Injectable()` decorator
- The `@Injectable()` decorator lets Angular 2 know that the class we're making can be used with Dependency Injection

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  login(): void {
    // Request and return data from the server
  }
}
```

---

## Using a Service (1/4)

- Now that the service has been created, it needs to be provided to parts of the app that rely on it
- Using the app module approach, services can be provided to the whole app

```ts
import ...
import { AuthService } from '../services/analytics';

@NgModule({
  bootstrap: [
    AppComponent 
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ]
}) 
```

---

## Using a Service (2/4)

- Components that consume services need to have the service listed as a provider
- If providing a service directly to a component, you must import the service and list it in the `providers` array

```ts
import { Component } from '@angular/core';
import { AuthService } from '../services/analytics';

@Component({
  selector: 'rio-login',
  providers: [AuthService],
  template: `<button type="button">Login</button>`
})
```

---

## Using a Service (3/4)

Whatever method is used to provide the service to the component, the component must then add a constructor that defines a private property, the value of which will be our service.

This tells Angular to provide an instance of `AuthService` when it sets up this component.

```ts
@Component({
  selector: 'rio-login',
  template: `<button type="button">Login</button>`
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
}
```

---

## Using a Service (4/4)

Once the service has been made available to the component, we can use its methods.

```ts
@Component({
  selector: 'rio-login',
  template: `
    <button type="button"
      (click)="authService.login()">
      Login</button>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
}
```
