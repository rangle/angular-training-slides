<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="routing-advanced" -->
## Building Applications with Angular

# Advanced Routing

---
<!-- .slide: id="routing-advanced-roadmap" -->
## Roadmap

FIXME: this module needs to be updated and proof-read

---
<!-- .slide: id="routing-advanced-defining-links-between-routes-1" -->
Alternatively, you can navigate to a route by calling the `navigate` function on the router with the path array as the argument. For example to navigate to component-one, we could use:

```ts
var path = ['/component-one'];
router.navigate(path);
```

---

## Defining Links Between Routes (2/2)
<!-- .slide: id="routing-advanced-defining-links-between-routes-2" -->
The path array can be seen as segments of an URL.
For example, using the following path in our array:

```ts
var path = ['/component-one', 'param1', 'param2'];
router.navigate(path);
```

Will navigate to:

```
http://localhost:4200/component-one/param1/param2
```

To use the router service, we need to import and inject it into our constructor.

```ts
import { Router } from '@angular/router';
...
constructor(router: Router){
  var path = ['/component-one'];
  router.navigate(path);
}
...
```

---
<!-- .slide: id="routing-advanced-handling-404" -->
## Handling 404

To detect unmatched routes you can use the `**` wildcard in the path.
This wildcard will actually match all URLs,
therefore its important that you list any other specific route paths prior to the `**` route.

This is usually your last route in the route configuration.

```ts
const routes: Routes = [
  { path: '/component-one', component: ComponentOne },
  { path: '/component-two', component: ComponentTwo },
  { path: '/component-three', component: ComponentThree },
  ...
  { path: '**', component: Four0FourComponent }
];
```

Note: This does not return a 404 status code.

---
<!-- .slide: id="routing-advanced-route-parameters" -->
## Route Parameters (1/2)

Adding `:id` in the path of the `product-details` route places the parameter in the route's path. For example `localhost:3000/product-details/5`

```ts
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
<!-- .slide: id="routing-advanced-route-parameters-2" -->
## Route Parameters (2/2)

The `ActivatedRoute` service provides a `params` Observable which we can subscribe to to get the route parameters.

```ts
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
<!-- .slide: id="routing-advanced-passing-optional-parameters-1" -->
## Passing Optional Parameters (1/2)

Use the `[queryParams]` directive along with `[routerLink]` to pass query parameters. For example:

```html
<a [routerLink]="['/product-list']" [queryParams]="{ page: 99 }">Go to Page 99</a>
```

Alternatively, we can navigate programmatically using the `Router` service:

```ts
  goToPage(pageNum) {
    this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
  }
```

---

## Passing Optional Parameters (2/2)
<!-- .slide: id="routing-advanced-passing-optional-parameters-2" -->
Similar to reading route parameters, the `Router` service returns an Observable we can subscribe to to read the query parameters:

```ts

ngOnInit() {
  this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.page = +params['page'] || 0; // (+) converts string 'page' to a number
    });
}

nextPage() {
  this.router.navigate(['/product-list'],
    { queryParams: { page: this.page + 1 } });
}
```

[View Example](http://plnkr.co/edit/Ko6VFRGRmu5jJ9ArwxvC?p=preview)

---
<!-- .slide: id="routing-advanced-lazy-loading-1" -->
## Lazy Loading (1/3)

To take advantage of lazy loading it's important to group the application into modules. Lazy Loading allows us to load modules of the application on demand. Because these modules are not loaded during our bootstrap phase, it helps us to decrease the startup time. On demand modules can be loaded when the user navigates to a specific route. In order to setup lazy loading we need the following:

* Remove the component from the `declarations` array of the root module
* In the route config use `loadChildren` in the path instead of a component
* In the route config we pass a string instead of a symbol to avoid loading the module eagerly
* In the route config we define not only the path to the module but the name of the class as well

Here is how our routing should look like:

```ts
const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
];
```

---
<!-- .slide: id="routing-advanced-lazy-loading-2" -->
## Lazy Loading (2/3)

There is nothing special in our `LazyModule` and `LazyComponent`,
they remain simple.
However routing for a feature module should always call `forChild` instead of `forRoot`,
which we have already seen.
This is specific to any feature modules and not related to lazy loading.

```ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';

const routes: Routes = [
  { path: '', component: LazyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
```

Our `LazyComponent` has now been setup for lazy loading.
If we start the app, we will see that the `LazyComponent` does not get loaded right away.
It only gets loaded the first time, when we navigate to the `lazy` route.
If we navigate back and forth now between an eager loaded and lazy loaded module,
we will see that both components are cached now.

[View Example](https://plnkr.co/edit/vpCqRHDAj7V6mlN1AknN?p=preview)

---
<!-- .slide: id="routing-advanced-route-authorization-1" -->
## Route Authorization (1/3)

To control whether the user can navigate to or away from a given route, we can use route guards.

In order to use route guards, we must register them with the specific routes we want them to run for.

```ts
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
<!-- .slide: id="routing-advanced-route-authorization-2" -->
## Route Authorization (2/3)

To guard a route against unauthorized activation, we can implement the `CanActivate` interface by implementing the `canActivate` function.

When `canActivate` returns `true`, the user can activate the route. When `canActivate` returns `false`, the user cannot access the route.

```ts
@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    return this.loginService.isLoggedIn(); // true or false
  }
}
```

---
<!-- .slide: id="routing-advanced-route-authorization-3" -->
## Route Authorization (3/3)

CanDeactivate works in a similar way to CanActivate but there are some important differences.

The canDeactivate function passes the component being deactivated as an argument to the function.

We can use that component to determine whether the user can deactivate.

```ts
canDeactivate(component: AccountPage) {
  return component.areFormsSaved();
}
```

---
<!-- .slide: id="routing-advanced-child-routes-1" -->
## Child Routes (1/4)

Child routes are a perfect case for parent/child pages or views.

For example:
The product details page may have a tabbed navigation section
that shows the product overview by default.
When the user clicks the "Technical Specs" tab the section shows the specs instead.
This feature is very common on sites like eBay or Amazon.

If the user clicks on the product with ID 3, we want to show the product details page with the overview:

```
localhost:3000/product-details/3/overview
```

When the user clicks "Technical Specs":

```
localhost:3000/product-details/3/specs
```

`overview` and `specs` are child routes of product-details/:id.

---

## Child Routes (2/4)
<!-- .slide: id="routing-advanced-child-routes-2" -->
The child routes are only reachable from within product details. Our Routes with children would look like:

```ts
export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  { path: 'product-details/:id', component: ProductDetails,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'specs', component: Specs }
    ]
  }
];
```

The parent product-details template will contain a `<router-outlet></router-outlet>`
to display the contents of the child.

---
<!-- .slide: id="routing-advanced-child-routes-3" -->
## Child Routes (3/4)


An alternative to display the `overview` content is to change our children array from:

```ts
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'specs', component: Specs }
    ]
```

to

```ts
    children: [
      { path: '', component: Overview },
      { path: 'specs', component: Specs }
    ]
```

This way we can get rid of the first empty item, which essentially just redirects the user to the `overview` route.

---
<!-- .slide: id="routing-advanced-child-routes-4" -->
## Child Routes (4/4)

To display the `overview` or `specs` section of a parent, the child route will need the product ID from the parent. The child route component can access the parent route's parameters as follows using the `Router` and `ActivatedRoute`

```ts
export default class Overview {
  parentRouteId: number;
  private sub: any;

  constructor(private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Get parent ActivatedRoute of this route.
    this.sub = this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        this.parentRouteId = +params["id"];
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```
