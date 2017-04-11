<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Pipes

---

## Roadmap

1. How do I format data using a pipe?
1. How do I create my own pipes?

---

## Motivation

- Classes could turn everything into strings for display
- Often easier to use a *pipe* in the HTML
  - Takes a value as input, produces a new value as output
  - Just like a Unix command-line pipe
- Angular comes with several pipes for common operations
- Very easy to add new ones

---

## Adding a Pipe

- Put the name of the pipe inside `{{…}}`
- Use vertical bar `|` as separator

_src/app/to-do-list/to-do-list.component.html_
```html
<ul>
  <li *ngFor="let item of thingsToDo; let i = index" id="{{i}}">
    {{item | uppercase}}
  </li>
</ul>
```

![Converting to Upper Case](content/images/screenshot-uppercase.png)

---

## Passing Arguments to the Pipe

- Pipes also accept arguments
- Use colon as delimiter

```html
Price is {{ 100.12345 | currency:"CAD":true:"1.2" | lowercase }}
```

produces:

```html
Price is ca$100.12
```

---

## Built-in Angular Pipes
 
- [date](https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html): formats dates in various ways
- [uppercase](https://angular.io/docs/ts/latest/api/common/index/UpperCasePipe-pipe.html): converts a string to upper case
- [lowercase](https://angular.io/docs/ts/latest/api/common/index/LowerCasePipe-pipe.html): converts a string to lower case
- [currency](https://angular.io/docs/ts/latest/api/common/index/CurrencyPipe-pipe.html): formats a number as a currency
- [percent](https://angular.io/docs/ts/latest/api/common/index/PercentPipe-pipe.html): formats a number as a percentage

---

## Generating a Pipe

- Use `ng generate pipe titlecase`
- Creates `src/app/titlecase.*`
  - Note: in the `app` directory
  - We could (and should) create a `pipes` directory
```
├── src
│   ├── app
│   │   ├── titlecase.spec.ts
│   │   └── titlecase.ts
```

---

## What's in a Pipe?

_src/app/titlecase.ts_
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})
export class TitlecasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }
}
```

- Import declarations from `@angular/core`
- Decorate class with `@Pipe` using `name` property
- `transform` accepts initial value and any optional arguments
- Returns some value

---

## Defining Our Transformation

_src/app/titlecase.ts_
```ts
export class TitlecasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.charAt(0).toUpperCase()
         + value.substr(1).toLowerCase();
  }
}
```

---

## Using Our Pipe

_src/app/to-do-list/to-do-list.component.html_
```html
<ul>
  <li *ngFor="let item of thingsToDo; let i = index" id="{{i}}">
    {{item | titlecase}}
  </li>
</ul>
```

![Converting to Title Case](content/images/screenshot-titlecase.png)
