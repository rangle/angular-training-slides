# Routing

---

## Why Routing?

- Routing allows the user to go straight into certain aspects of the application.
- This is very convenient as it can keep your application linkable and bookmarkable and allow users to share links with others.

Routing allows you to:

- Maintain the state of the application
- Implement modular applications
- Implement the application based on the roles (certain roles have access to certain URLs)

Notes:

Unlike with server-side front-end solutions, this is optional - we can build the full application without ever changing the URL.

---

## Configuring Routes (1/3) - Base URL Tag

The Base URL tag must be set within the `<head>` tag of index.html:

```html
 <base href="/">

```

This tells the router how to compose navigation URLs.

Notes:

In the demos we use a script tag to set the base tag. In a real application it must be set as above.

---

## Configuring Routes (2/3) - Route Definition Object

The `Routes` type is an array of routes that defines the routing for the application.

```javascript
const routes: Routes = [
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];
```

Each route can have different attributes; some of the common attributes are:
* _path_ - URL to be shown in the browser when application is on the specific route
* _component_ - component displayed when the application is on the specific route
* _redirectTo_ - redirect route if needed;
* _pathMatch_ - optional propety to match full URLs or just the beginning
* _children_ - array of route definitions objects representing the child routes

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
export class AppModule { ... }

platformBrowserDynamic().bootstrapModule(AppModule);
```

---

## Redirecting the Router to Another Route

When your application starts, it navigates to the empty route by default.
We can configure the router to redirect to a named route by default:

```javascript
export const routes: Routes = [
  { path: '', redirectTo: 'component-one', pathMatch: 'full' },
  { path: 'component-one', component: ComponentOne },
  { path: 'component-two', component: ComponentTwo }
];
```

This tells the router to redirect to component-one when matching the empty path ('').

When starting the application, it will automatically navigate to the route for `component-one`.

---

## Defining Links Between Routes

Add links to routes using the `RouterLink` directive.

For example the following code defines a link to the route at path `component-one`.

```html
<a [routerLink]="['/component-one']">Component One</a>
```

Alternatively, you can navigate to a route by calling the `navigate` function on the router:

```javascript
this.router.navigate(['/component-one']);
```