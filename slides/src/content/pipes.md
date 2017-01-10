# Pipes

---

## Built-in Pipes

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

**Built-in pipes:** `async`, `decimal`, `json`, `slice`, `currency`, `lowercase`, `uppercase`, `date`, `percent`, `i18nplural`

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

---

## Pure vs Impure Pipes

- A pure pipe is executed everytime the **reference** of the bound value is changed
  - Custom pipes are pure by default
  - All built-in pipes are pure except of `async`

```ts
@Pipe({ name: 'pure' })
export class PurePipe implements PipeTransform { /* ... */ }
```

- An impure pipe is executed everytime change detection is executed
  - App performance could be severely degraded
  - To define a pipe as impure, we need to use the property/value `pure: false`

```ts
@Pipe({ name: 'impure', pure: false })
export class ImpurePipe implements PipeTransform { /* ... */ }
```

[View Example](https://plnkr.co/edit/a6TYpCugGXlz12B2RI2t?p=preview)

Notes:

- Simple types like `string`, `number` and `boolean` are immutable by default
- Mutating an `object` or an `array` does not change the reference

---

## The Async Pipe

- Impure and stateful built-in pipe that subscribes to observables and promises
- Ideal to handle async properties in a template
- Highly performant

```ts
@Component({
  selector: 'app-root',
  template: `
    <p>{{ myPromise | async }}</p>
    <p>{{ myObservable$ | async }}</p>
  `
})
export class AppComponent {
  myPromise = Promise.resolve('Hello');
  myObservable$ = Observable.interval(1000);
  
}
```

[View Example](https://plnkr.co/edit/rpUAzH8sPK5c1NEJtAVl?p=preview)