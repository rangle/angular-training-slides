# Routing Exercise

![Routing App Preview](preview.gif)

## Step 1

Using the `angular-cli` create a new project in the training folder called `routing-exercise` with the `--routing` flag:

```
ng new routing-exercise --routing
```


## Step 2

Use the `angular-cli` to build the components and service we need by running the following commands:

```
ng generate component home
ng generate component page-list
ng generate component page-detail
```

> The components are added to our ng-module automatically, so they are ready to use.

## Step 3

Add the following snippet to `app.component.css`:

```css
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li  {
 float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
```

## Step 4

Add the following snippet to the `app.component.html`

```html
<ul>
   <li>
      <a>Dashboard</a>
    </li>
    <li>
      <a>Pages</a>
    </li>
</ul>
```


## Step 5

Modify the anchor tags we just added to `app.component.html` by using the `routerLink` directive so that they point to the root path `"/"` and the pages path `"/pages"`. Then add the `router-outlet` directive so that angular knows where to display the components.


## Step 6

Import the `HomeComponent` and `PageListComponent` in `app-routing.module.ts`. Update the routes so that the root path `"/"` loads the `HomeComponent` and the `"/pages"` path loads the `PageListComponent`.

## Step 7

Replace `page-list.component.html` with the following snippet:

```html
<h1>Pages</h1>

<ul>
  <li *ngFor="let pageId of [1,2,3]">
    <a>
      Page {{pageId}}
    </a>
  </li>
</ul>
```

## Step 8

Modify the `page-list.component.html` using the routerLink directive so that each link navigates to the appropriate sub-page.

## Step 9

Add the following snippet to the `page-detail.component.html` file:

```html
<h2>Page {{pageId}}</h2>
```

## Step 10

Create another route in `app-routing.module.ts` for the `PageDetailComponent` that takes an extra `:id` parameter.

## Step 11

Import and inject the `ActivatedRoute` into the `PageDetailComponent`.

## Step 12

Finally, update the `PageDetailComponent` to subscribe to the `ActivatedRoute`, then use the `id` parameter from the route to load the page number.

