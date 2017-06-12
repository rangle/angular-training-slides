<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="hello" -->
## Building Applications with Angular

# Hello, World

---
<!-- .slide: id="hello-roadmap" -->
## Roadmap

1. What makes up a component?
1. How is a component's behavior defined?
1. How is a component's appearance defined?
1. How do I run an Angular application?

---
<!-- .slide: id="hello-whats-where-1" -->
## What's Where

```
├── src
│   ├── index.html
│   ├── main.ts
│   ├── app/...
```

The root directory has:

- `index.html`: contains the entire application
  - Everything interesting right now is one level down in `app`
- `main.ts`: bootstraps the application
  - This can change from platform to platform
  - So that everything else doesn't have to

---
<!-- .slide: id="hello-whats-where-2" -->
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
<!-- .slide: id="hello-whats-in-the-component-1" -->
## What's in the Component?

#### _src/app/app.component.ts_
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

- `Component` is a **decorator** used to define Angular components
- Decorators allows us to alter a class or function
  - In this case, add metadata for Angular to use

---
<!-- .slide: id="hello-whats-in-the-component-2" -->
## What's in the Component?

#### _src/app/app.component.ts_
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
<!-- .slide: id="hello-whats-in-the-component-3" -->
## What's in the Component?

#### _src/app/app.component.ts_
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
<!-- .slide: id="hello-notes-on-components" -->
## Notes on Components

- Components are the core building blocks of Angular applications
  - Application logic + display
  - Everything on a page should be associated with some component
- Can put HTML and CSS inline using `template` and `style`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',          // inline HTML
  styles: ['h1 { font-weight: normal; }']  // inline styles
})
export class AppComponent {
  title = 'app works!';
}
```

---
<!-- .slide: id="hello-template-syntax" -->
## Component Template Syntax

- `<h1>{{title}}</h1>` represents *interpolation*
- Evaluates the expression in `{{...}}` and inserts the result as a string
- Symbols such as `title` are evaluated in an expression context
- In this case, the component instance
- We'll see lots more syntax later...

---
<!-- .slide: id="hello-running-the-application" -->
## Running the Application

- `npm run start` launches the application
  - Command is defined in the `scripts` section of `./package.json`
  - Note: use `npm` to run, *not* `ng`, this ensures the local version of the Angular CLI is used, not the one globally installed on your machine.
- By default, preview on <http://localhost:4200>
- Should see **app works!**
- Worth exploring the page using developer tools

---
<!-- .slide: id="hello-quiz" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

The name for the root module should be `_________`:

1. `NgModule`
1. `AppModule`
1. Whatever you want.

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 2.

1: `NgModule` is the name of the Decorator used for any Angular
module.  One can easily mistake between `NgModule` and `AppModule`.

3: While it's possible that the root module can be anything,
convention is to name it `AppModule`.  This could be a good chance to
bring it up that it's convention.
