<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Hello, World

---

## Roadmap

1. What makes up a component?
1. How is a component's behavior defined?
1. How is a component's appearance defined?
1. How do I run an Angular application?

---

## What's Where

```
├── src
│   ├── index.html
│   ├── main.ts
│   ├── app/…
```

The root directory has:

- `index.html`: contains the entire application
  - Everything interesting right now is one level down in `app`
- `main.ts`: bootstraps the application
  - This can change from platform to platform
  - So that everything else doesn't have to

---

## What's Where

```
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
```

The *application* as a whole has:

- `app.module.ts`: what to load and how to launch
- Main application:
  - Code: `app.component.ts`
  - HTML: `app.component.html`
  - CSS: `app.component.css`
  - Test spec: `app.component.spec.ts`

---

## What's in the Component?

_src/app/app.component.ts_
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

- `import` loads definition of Angular components

---

## What's in the Component?

_src/app/app.component.ts_
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

- `@Component` is a *decorator* that adds metadata to the `AppComponent` class
  - `selector` tells Angular to use this class to fill in uses of `<app-root></app-root>`
  - `templateUrl` tells it where to find the HTML to use for filling in
  - `styleUrls` is a list of CSS style files to apply to this component

---

## What's in the Component?

_src/app/app.component.ts_
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
```

- The `AppComponent` class defines how this component behaves
- So far, it just has a single instance variable and no actions
- Note that we don't need to declare the type of `title`
  - TypeScript does *type inference* to figure that out

---

## Notes on Components

- Components are the core building blocks of Angular applications
  - Application logic + display
  - Everything on a page should be associated with some component
- Can put HTML and CSS inline by using `template` and `style` as keys

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>,          // inline HTML
  styles: ['h1 { font-weight: normal; }'] // inline styles
})
export class AppComponent {
  title = 'app works!';
}
```

- Resist the temptation

---

## Component Template Syntax

- `<h1>{{title}}</h1>` represents *interpolation*
- Evaluates the expression in `{{…}}` and inserts the result as a string
- Symbols such as `title` are evaluated in an expression context
- In this case, the component instance
- We'll see lots more syntax later…

---

## Running the Application

- `npm run start` launches the application
  - Command is defined in `./package.json`
  - Note: use `npm` to run, *not* `ng`
- By default, preview on <http://localhost:4200>
- Should see **app works!**
- Worth exploring the page using developer tools

---

## Quiz

The name for the root module should be _________.:

1. `NgModule`
1. `AppModule`
1. Whatever you want.

+++

## Answer

Correct answer is 2.

1: `NgModule` is the name of the Decorator used for any Angular
module.  One can easily mistake between `NgModule` and `AppModule`.

3: While it's possible that the root module can be anything,
convention is to name it `AppModule`.  This could be a good chance to
bring it up that it's convention.
