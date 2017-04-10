
## Formatting Output

- An expression can be passed into an Angular pipe. This transforms it into a new value
- Angular has a number of built-in pipes for common use such as `LowerCasePipe` and `DatePipe`

```html
<h2>Search results</h2>
<p>Your search <strong>{{search.term | lowercase}}</strong> had {{search.results}} results.</p>
```
[View Example](https://plnkr.co/edit/HjvjjxmZhpk7VyiycQj5?p=preview)

---

## Passing Arguments to the Pipe

- Pipes also accept arguments
- Are colon delimited sets of values

```html
Angular 2.0 was released on {{ng2ReleaseDate | date:'fullDate'}}
```

[View Example](https://plnkr.co/edit/6dKkWSzX3JdUyKyGjWg1?p=preview)

## Built-in Angular Pipes
 
- [DatePipe](https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html) - Formats dates with configuration options
- [UpperCasePipe](https://angular.io/docs/ts/latest/api/common/index/UpperCasePipe-pipe.html) - Formats a string upper case
- [LowerCasePipe](https://angular.io/docs/ts/latest/api/common/index/LowerCasePipe-pipe.html) - Formats a string to lower case
- [CurrencyPipe](https://angular.io/docs/ts/latest/api/common/index/CurrencyPipe-pipe.html) - Formats a number to a currency based on a locale
- [PercentPipe](https://angular.io/docs/ts/latest/api/common/index/PercentPipe-pipe.html) - Formats numbers as a percentage based on a locale

---

## Generating a Pipe

- Generate using the Angular CLI
- `ng generate pipe [pipe path]`
- Pipe is added to app module declarations

---

## A Look at the Pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'greet' })
export class GreetPipe implements PipeTransform {
  transform(name: string, title = ''): string {
    return `Hello, ${title} ${name}`;
  }
}
```
[View Example](https://plnkr.co/edit/Jts8wGqIW0gG932sBzMm?p=preview)

- `Pipe` imported from `@angular/core`
- `@Pipe` is a decorator
- `name` property instead of selector
- Pipe name is not prefixed
- Implements the `PipeTransform` interface
- `transform` acceps initial value to pipe followed by all arguments passed
- Returns some value
