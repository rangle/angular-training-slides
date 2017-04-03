# Routing

---

## Why Routing?

- Routing allows the user to navigate to different parts of the application.
- It keeps your application linkable and bookmarkable and allow users to share links with others.

Routing allows you to:

- Maintain the state of the application.
- Create modular applications (every module define its own routes).
- Implement authorization (certain roles have access to certain URLs).

Note:

- Routing is optional, we can build an application that never changes the URL.

---

## Configuring Routes (1/3) - Base URL Tag

The Base URL tag must be set within the `<head>` tag of index.html:

```html
 <base href="/">
```

This tells the router how to compose navigation URLs.

---

## Configuring Routes (2/3) - Route Definition Object

The `Routes` type is an array of routes that defines the routing for the application.

```javascript
const routes: Routes = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];
```

Each route can have different attributes. Some common attributes are:

* `path`: URL to be shown in the browser when application is on the specific route
* `component`: Component displayed when the application is on the specific route
* `redirectTo`: Redirect route if needed;
* `pathMatch`: Optional propety to match full URLs or just the beginning
* `children`: Array of route definitions objects representing the child routes

Notes:

- Each route can have either component or redirect attribute defined in the route.
- redirectTo and children properties are covered later in this chapter.

---

## Configuring Routes (3/3) - RouterModule

`RouterModule.forRoot` takes the `Routes` array as an argument and returns a _configured_ router module.
This router module must be specified in the list of imports of the app module.

```javascript
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'component-one', component: ComponentOne }];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [ BrowserModule, routing ],
  declarations: [ AppComponent, ComponentOne ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

---

## Dynamically Adding Route Components

Rather than define each route's component separately, use `RouterOutlet`.
Angular dynamically adds the component corresponding to the active route into the `<router-outlet></router-outlet>` element.

```javascript
@Component({
  selector: 'rio-app',
  template: `
    <nav>
      <a [routerLink]="['/component-one']">Component One</a>
      <a [routerLink]="['/component-two']">Component Two</a>
    </nav>
    <!-- Route components are added by router here -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
```

[View Example](https://plnkr.co/edit/3EH52DtjS1Z5fUbycMX9?p=preview)

---

## Defining Links Between Routes

Add links to routes using the `RouterLink` directive.

For example the following code defines a link to the route at path `component-one`.

```html
<a [routerLink]="['/component-one']">Component One</a>
```

Alternatively, you can navigate to a route by calling the `navigate` function on the router with the path array as the argument. For example to navigate to our component-one, we could use:

```javascript
var path = ['component-one'];
router.navigate(path);
```

The path array can be seen as segments of an URL. 
For example, using the following path in our array:

```javascript
var path = ['component-one', 'param1', 'param2'];
router.navigate(path);
```

Will navigate to:

```
http://localhost:4200/component-one/param1/param2
```

To use the router service, we need to import it and inject it into our constructor. 

```javascript
import { Router } from '@angular/router';
...
constructor(router: Router){
  var path = ['component-one'];
  router.navigate(path);
}
...
```

---

## Handling 404

To detect unmatched routes you can use the `**` wildcard in the path. 
This wildcard will actually match all URLs, therefore its important that you list any other specific route paths prior to the `**` route. This is usually your last route in the route configuration. 

```javascript
const routes: Routes = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo },
  { path: 'component-three', component: ComponentThree },
  ...
  { path: '**', component: Four0FourComponent }
];
```

Note: This does not return a 404 status code. 

---
## Route Parameters (1/2)

Adding `:id` in the path of the `product-details` route places the parameter in the route's path. For example `localhost:3000/product-details/5`

```javascript
export const routes: Routes = [
  { path: 'product-details/:id', component: ProductDetails }
];
```

`routerLink` directive passes an array which specifies the path and the route parameter. This links the route to the parameter.

```html
<a *ngFor="let product of products"
  [routerLink]="['/product-details', product.id]">
  {{ product.name }}
</a>
```

---

## Route Parameters (2/2)

The `ActivatedRoute` service provides a `params` Observable which we can subscribe to to get the route parameters.

```javascript
import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class ProductDetails {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       // params['id'] is the product's id
    });
  }
}
```

[View Example](https://plnkr.co/edit/lxQRQVqKU7VOqfZYWPuf?p=preview)

Notes:

The reason that the `params` property on `ActivatedRoute` is an Observable is that the router may not recreate the component when navigating to that same component. In this case the parameters may change without the component being recreated.

---

## Passing Optional Parameters (1/2)

Use the `[queryParams]` directive along with `[routerLink]` to pass query parameters. For example:

```html
<a [routerLink]="['product-list']" [queryParams]="{ page: 99 }">Go to Page 99</a>
```

Alternatively, we can navigate programmatically using the `Router` service:

```javascript
  goToPage(pageNum) {
    this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
  }
```

---

## Passing Optional Parameters (2/2)

Similar to reading route parameters, the `Router` service returns an Observable we can subscribe to to read the query parameters:

```javascript

ngOnInit() {
  this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.page = +params['page'] || 0; // (+) converts string 'page' to a number
    });
}

nextPage() {
  this.router.navigate(['product-list'],
    { queryParams: { page: this.page + 1 } });
}
```

[View Example](http://plnkr.co/edit/Ko6VFRGRmu5jJ9ArwxvC?p=preview)

---

## Lazy Loading - WIP

To take advantage of lazy loading it's important to group the application into modules. Lazy Loading allows us to load modules of the application on demand. Because these modules are not loaded during our bootstrap phase, it helps us to decrease the startup time. On demand modules can be loaded when the user navigates to a specific route. Let's take a look at a simple example:

*root module app/app.module.ts*
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EagerComponent } from './eager.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    EagerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

This is a very basic module with two components: `AppComponent` and `EagerComponent`. Let's take a look at the `AppComponent` where the navigation is defined. 

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>My App</h1>
    <nav>
      <a routerLink="eager">Eager</a>
      <a routerLink="lazy">Lazy</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
``` 

Our `routing` file looks like this:

```javascript
const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
];
```

FIXME: Better flesh out these authorization sections.
https://github.com/rangle/angular-training-slides/issues/263
(Content from: https://angular-2-training-book.rangle.io/handout/routing/route_guards.html)

## Route Authorization (1/3)

To control whether the user can navigate to or away from a given route, we can use route guards.

In order to use route guards, we must register them with the specific routes we want them to run for.

```javascript
const routes: Routes = [
  { path: 'home', component: HomePage },
  {
    path: 'accounts',
    component: AccountPage,
    canActivate: [LoginRouteGuard],
    canDeactivate: [SaveFormsGuard]
  }
];
```

---

## Route Authorization (2/3)

To guard a route against unauthorized activation, we can implement the `CanActivate` interface by implementing the `canActivate` function.

When `canActivate` returns `true`, the user can activate the route. When `canActivate` returns `false`, the user cannot access the route.

```javascript
@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    return this.loginService.isLoggedIn(); // true or false
  }
}
```

---

## Route Authorization (3/3)

CanDeactivate works in a similar way to CanActivate but there are some important differences.

The canDeactivate function passes the component being deactivated as an argument to the function.

We can use that component to determine whether the user can deactivate.

```javascript
canDeactivate(component: AccountPage) {
  return component.areFormsSaved();
}
```

---

FIXME: What are child routes
https://github.com/rangle/angular-training-slides/issues/280
Content: https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
- show path configuration for child routes
- show example how this is useful