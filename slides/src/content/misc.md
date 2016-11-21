# Miscellaneous Topics

---

## Component Lifecycle

Angular manages creation, rendering, data-bound properties etc. It also offers hooks that allow us to respond to key lifecycle events.

These are the most-used lifecycle hooks:

- `ngOnInit` - When bound inputs pass values the first time.
- `ngOnDestroy` - Before component is destroyed.
- `ngAfterContentInit` - After component's (ng-)content is initialized.
- `ngAfterViewInit` - After component's view is initialized.

**Pro Tip:** Prefer putting initialization logic in `ngOnInit` instead of `constructor`

[View Example](https://plnkr.co/edit/0hHM5hQJLuuwA8scxAil?p=preview)

---

## Change Detection (Angular 1 vs 2)

![File Structure](content/images/angular1-vs-angular2.jpg)

- Angular 1: Two-way data binding. Nodes traversed one or more times.
- Angular 2: One-way data binding. Nodes traversed once.

---

## Pipes

In Angular 1, these were called filters

```html
<p>{{ 'Hello, World!' | lowercase }}</p>
<!-- <p>hello, world!</p> -->
```

Passing arguments:

```html
<p>Total price is {{ 10.1234 | currency: "CAD": true }}</p>
<!-- <p>Total price is CA$10.12</p> -->
```

Chaining pipes: 

```html
<p>Total price is {{ 10.1234 | currency: "CAD" | lowercase }}</p>
<!-- <p>Total price is ca10.12</p> -->
```

**Built-in pipes:** `async`, `decimal`, `json`, `slice`, `currency`, `i18nplural`, `lowercase`, `uppercase`, `date`, `i18nselect`, `percent`

[View Example](https://plnkr.co/edit/p89vQtCkr51Turd3R2pM?p=preview)

Notes: 

- 3rd argument for currency is whether to show $ symbol

---

## Custom Pipes

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'greet' })
export class GreetPipe implements PipeTransform {

  transform(name: string, title = ''): string {
    return `Hello, ${title} ${name}`;
  }
}
```

Usage:

```html
<p>Hello {{ 'Smith' | greet }}</p>
<!-- <p>Hello, Smith</p> -->

<p>Hello {{ 'Smith' | greet: 'Mr.' }}</p>
<!-- <p>Hello, Mr. Smith</p> -->
```
