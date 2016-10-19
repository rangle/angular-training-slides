# Misc

---

## Component Lifecycle

Angular manages creation, rendering, data-bound properties etc. It also offers hooks that allow us to respond to key lifecycle events.

- `ngOnInit` - When bound inputs pass values the first time.
- `ngOnDestroy` - Before component is destroyed.
- `ngAfterContentInit` - After component's (ng-)content is initialized.
- `ngAfterViewInit` - After component's view is initialized.

These are the most-used lifecycle hooks. See the [Angular Guide](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html) for more.

---

## Change Detection (Angular 1 vs 2)

![File Structure](content/images/angular1-vs-angular2.jpg)

- Angular 1: Two-way data binding. Nodes traversed one or more times.
- Angular 2: One-way data binding. Nodes traversed once.

---

## Pipes

In Angular 1, these were called filters

```html
<p>{{ Hello, World! | lowercase }}</p>
<!-- <p>hello, world!</p> -->
```

- Pass arguments

```html
<p>Total price is {{ 10.1234 | currency: "CAD": true }}</p>
<!-- <p>Total price is CA$10.12</p> -->
```

- Chain pipes 

```html
<p>Total price is {{ 10.1234 | currency: "CAD" | lowercase }}</p>
<!-- <p>Total price is ca10.12</p> -->
```

[View Example](http://plnkr.co/edit/4lkikl3GShOcFve1RY7g?p=preview)

Notes: 

- 3rd argument for currency is whether to show $ symbol

---

## Custom Pipes

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'greet' })
export class MyPipe implements PipeTransform {
  transform(noun, title) {
    const _title = title ? `${title} ` : '';
    return `Hello, ${_title}${noun}`;
  }
}
```

Usage:

```ts
<p>Hello {{ 'Smith' | greet: 'Mr.' }}</p>
<!-- <p>Hello, Mr. Smith</p> -->
```

---

## Feature Modules

When the root module gets too big, start grouping similar parts into **feature modules**.

---

## Creating a Feature Module

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import files that belong to feature module

@NgModule({
  imports: [ CommonModule ],
  declarations: [ components, directives, pipes ],
  providers: [ services ],
  exports: [ MainFeatureComponent, publicDeclarations ]
})
export class FeatureModule {}
```

- Note we're importing `CommonModule` this time (not `BrowserModule`)
- No need to bootstrap
- The `export` makes declarations public (not needed in root)
