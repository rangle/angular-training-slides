# Services and Dependency Injection (DI)

---

## Angular 2 Services

- A service is a re-usable piece of functionality shared across the app
- Services are consumed by other Angular2 elements (components, directives, pipes or other services)
- They are provided to these elements through Dependency Injection
- Services are singletons

---

## When to Use Services

- Keep components simple and let services do the heavy lifting
- IO operations belong in services (server communication, localstorage)
- Can be used to handle application state (though Redux is more robust)

---

## Angular 2 Dependency Injection

- Dependency injection (DI) is a programming pattern that simplifies dependency management
- Dependencies are provided to dependent elements which use them
- In Angular, DI is used to provide services to components and other elements

---

## Creating a Service

- Services are regular classes with the `@Injectable()` decorator
- Allows us to use the class with Dependency Injection

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

## Registering a Service

Once created, the service must be provided to the app

```ts
import ...
import { AuthService } from '../services/analytics';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent 
  ],
}) 
```

---

## Consuming a Service in a Component (1/2)

- Components that rely on a service should define a private property in the constructor with the service assigned as the value
- This tells Angular to provide an instance of `AuthService` when it sets up this component.

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

## Consuming a Service in a Component (2/2)

Once the service has been made available to the component, we can use its methods.

```ts
@Component({
  selector: 'rio-login',
  template: `
    <button type="button" (click)="onLogin()">Login</button>
  `
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  
  onLogin(): void {
    this.authService.login();
  }
}
```
