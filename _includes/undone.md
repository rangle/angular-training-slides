<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="unused" -->
## Building Applications with Angular

# Unused Material

---

## Everything after this point has *NOT* been edited

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Which text will the following component template render out to the screen when used in this way?

Component declaration:

```ts
@Component({
  selector: 'card',
  template: `
    <ng-content select="[header]"></ng-content>
    <p>Body text</p>
  `
})
```

Usage:

```html
<card>
  <header>Main Header</header>
  <div header>Other Header</div>
</card>
```

1. Other Header<br>
   Body text
2. Main Header<br>
   Body text
3. Main Header<br>
   Other Header<br>
   Body text

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 1.

2, 3: `select` operates on a subset of CSS selectors `[header]`
denotes an attribute named `header` rather than an element selector of
`header`.

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Which text will the following component template render out to the screen when used in this way?

Component declaration:

```ts
@Component({
  selector: 'card',
  template: `
    <ng-content></ng-content>
    <p>Body text</p>
    <ng-content></ng-content>
  `
})
```

Usage:

```html
<card>
  <header>Main Header</header>
  <div>Other Header</div>
</card>
```

1. Main Header<br>
   Other Header<br>
   Body text
2. Main Header<br>
   Other Header<br>
   Body text
   Main Header<br>
   Other Header<br>
3. Body text
   Main Header<br>
   Other Header<br>
4. None. An error will be thrown because multiple bare `<ng-content>` tags are not supported

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

1, 2: When multiple bare `<ng-content>`'s are present, Angular will
render projected content into that last `<ng-content>` block ignoring
the others.

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Which text will the following component template render out to the screen when used in this way?

Component declaration:

```ts
@Component({
  selector: 'tab-list',
  template: `<ng-content select="tab"></ng-content>`
})
```

Usage:

```html
<tab-list>
  <nav>
    <tab>Tab1</tab>
    <tab>Tab2</tab>
    <tab>Tab3</tab>
  </nav>
  <tab>New</tab>
</tab-list>
```

1. Tab1 Tab2 Tab3 New
2. New Tab1 Tab2 Tab3
3. New

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

1, 2: `select` will only do a shallow selector match. Children of
other elements do not get selected.

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Which text will the following component template render out to the screen when used in this way?

Component declaration:

```ts
@Component({
  selector: 'fox',
  template: `
    <ng-content></ng-content>
    The quick brown fox
    <ng-content select="span"></ng-content>
  `
})
```

Usage:

```html
<fox>
  <span> greatly leaps and</span>
  <span> bounds over the lazy dog</span>
  We can only know one thing for sure.
</fox>
```

1. greatly leaps and bounds over the lazy dog We can only know one thing for sure. The quick brown fox greatly leaps and bounds over the lazy dog
2. We can only know one thing for sure. The quick brown fox greatly leaps and bounds over the lazy dog
3. The quick brown fox greatly leaps and bounds over the lazy dog
4. None. An error will be thrown because `select` does not work along side a bare `<ng-content>` tag

Correct answer is 2.

1, 3, 4: When used in conjunction with `select`, a standard
`<ng-content>` will act as a catch-all and will projection any content
not captured by other selectors. It does not blindly select everything

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Which text will the following component template render out to the screen when used in this way?

Component declaration:

```ts
@Component({
  selector: 'fox',
  template: 'The quick brown fox <ng-content select="span"></ng-content>'
})
```

Usage:

```html
<fox>
  <span> greatly leaps and</span>
  <span> bounds over the lazy dog</span>
</fox>
```

1. The quick brown fox bounds over the lazy dog
1. The quick brown fox greatly leaps and
1. The quick brown fox greatly leaps and bounds over the lazy dog
1. None. An error will be thrown because `select` does not support multiple matching elements

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

1, 2: It may seem ng-content `select` should only match a single
element as there is only one `<ng-content>` tag. This is not the
case. Both spans will be rendered.

4: `select` will greedily match as many elements as it can.

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

What needs to be added to the following component declaration in order
for this markup to be valid `<clock [(time)]="currentTime"></clock>`:

```ts
@Component({
  selector: 'clock',
  template: `...`
})
export class ClockComponent {
  @Input() time;
}
```

1. `@Output() time = new EventEmitter();`
2. `@Output() timeChange;`
3. `@Output() timeChange = new EventEmitter();`
4. `@Output() onChange = new EventEmitter();`

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

1: This may expose a misunderstanding of class member declarations in TypeScript.

2: This answer may expose a misunderstanding between the implicit
behavior of the `@Input()` decorator and having to explicitly
construct and assign an `EventEmitter` to a member decorated with
`@Output()`. It may be assumed that by decorating something as an
output you should achieve the expected behavior.

3: This may expose confusion between the relationship of the property
names and that suffixing an output member name with `Change`.

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

`<clock [(time)]="currentTime"></clock>` is equivalent to the long-hand form of:

1. `<clock (time)="currentTime" [time]="currentTime"></clock>`
2. `<clock [time]="currentTime" (time)="currentTime=$event"></clock>`
3. `<clock (time)="currentTime" [timeChange]="currentTime=$event"></clock>`
4. `<clock [time]="currentTime" (timeChange)="currentTime=$event"></clock>`

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 4.

1: This may expose a misunderstanding of outputs and two-way binding
itself, since the short-hand syntax looks like a simple combination of
these two attributes.

2: This answer may expose confusion with the naming relationship
between `time` and `timeChange`.

3: Input/output syntax is not well understood.

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

What is one way in which to interface with a two-way bound property
that allows us to handle changes to a value, rather than synchronize
values?

1. `<clock [time]="currentTime" (timeChange)="onTimeChange()"></clock>`
2. `<clock [time]="currentTime" (timeChange)="onTimeChange($event)"></clock>`
3. You can't, two-way bound properties must be used to keep data in sync.
4. `<clock [time]="currentTime" (timeChange)="onTimeChange(time)"></clock>`

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 2.

1: This may expose the assumption that values will be implicitly
passed into the called back provided.

3: This answer may expose confusion of how two-way bindings actually
work.

4: This may expose confusion or a lack of understanding what the the
`$event` variable represents.

---

## Component Lifecycle

Angular manages creation, rendering, data-bound properties etc. It also offers hooks that allow us to respond to key lifecycle events.

These are the most-used lifecycle hooks:

- `ngOnInit` - When bound inputs pass values the first time.
- `ngOnDestroy` - Before component is destroyed.
- `ngAfterContentInit` - After component's (ng-)content is initialized.
- `ngAfterViewInit` - After component's view is initialized.

**Pro Tip:** Prefer putting initialization logic in `ngOnInit` instead of `constructor`

---

## Pure vs Impure Pipes

- A pure pipe is executed every time the **reference** of the bound value is changed
  - Custom pipes are pure by default
  - All built-in pipes are pure except of `async`

```ts
@Pipe({ name: 'pure' })
export class PurePipe implements PipeTransform { /* ... */ }
```

- An impure pipe is executed every time change detection is executed
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

---

## Two-Way Data Binding

- Combination of an `@Input` with an `@Output` using the *banana in a box* syntax `[(event)]`
- The name of the event has to be equal to the name of the input plus the suffix "Change".

```html
<rio-counter [count]="count" (countChange)="count=$event"></rio-counter>
```

Is equivalent to:

```html
<rio-counter [(count)]="count"></rio-counter>
```

The built-in directive `NgModel` uses this trick to behave similar to Angular 1:

```html
<input [(ngModel)]="name" />
```

Which is equivalent to:

```html
<input [ngModel]="name" (ngModelChange)="name=$event" />
```

---

## Two-Way Data Binding Example

```ts
@Component({ selector: 'rio-counter',  ... })
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  increment(): void {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

The parent component can use now the *banana in a box* syntax

```ts
@Component({
  selector: 'rio-app',
  template:'<rio-counter [(count)]="myNumber"></rio-counter>'
})
class AppComponent { myNumber = 0 }
```

[View Example](http://plnkr.co/edit/nJZQYSV23sCcbb37FzLN?p=preview)

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Choose all of the following that are needed to make two-way data binding work.

1. `@Input` decorator
2. `@Output` decorator
3. `[]` attribute (as in `[hello]="hello!"`)
4. `()`attribute (as in `(click)=sayHi()`)

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Selecting ALL of them is correct.

If the student picks either 3 or 4, it could be that the student forgot that
the "banana in a box" syntax `[()]` is in fact combination of `[]` and `()`

---

## Creating a Template Variable from a Directive

- We can create template variables from directives using the `#myVariable="exportedAsValue"` syntax
- `exportedAs` value is a property that every built-in directive has to create a reference
- The value of the property `exportedAs` of the directive `NgForm` is `ngForm` ([docs](https://angular.io/docs/ts/latest/api/forms/index/NgForm-directive.html))

```ts
@Component({
  selector: 'rio-app',
  template: `
    <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">
      <label>Name: <input name="name" ngModel></label>
      <button type="submit">Submit</button>
    </form>
    <pre>{{ values | json }}</pre>`
})
export class AppComponent {
  values: any;
  submitForm (form: NgForm): void {
    this.values = form.value;
  }
}
```    

[View Example](https://plnkr.co/edit/ttVaCf?p=preview)

Notes:

- The value of the property `exportedAs` of the directive `NgForm` is `ngForm`
- The enhanced component instance has validation, the native `form` component doesn't

---

## Template Projection

- Ability to pass HTML to a child component and have it rendered there
- This was called _transclusion_ in Angular 1
- Use the built-in component `<ng-content>` to define where to render the projected content

```ts
@Component({
  selector: 'rio-app',
  template: `<rio-child>
               <p>Projected content</p>
             </rio-child>`
})
class AppComponent {}
```

```ts
@Component({
  selector: 'rio-child',
  template: `<h4>Child Component</h4>
             <ng-content></ng-content>`
})
class ChildComponent {}
```

[View Example](http://plnkr.co/edit/oqkyldgOxykReRsffVxZ?p=preview)

---

## Defining Multiple Projection Areas

- Multiple `<ng-content>` tags can be used in a template by using the `select` attribute
- In the template, we can use an HTML tag, say, `<header>` to specify the position of projected content to the `ng-content` with `select="header"`

```
  <!-- Parent Component -->
  <rio-child>
    <header><p>This is my header content</p></header>
    <footer><p>This is my footer content</p></footer>
  </rio-child>`
```

```
  <!-- Child Component -->
  <h4>Child Component</h4>
  <ng-content select="header"></ng-content>
  <ng-content select="footer"></ng-content>
```

[View Example](https://plnkr.co/edit/kwD3iKLU8mELAoHj2fBv?p=preview)

---

## Multiple Projections with Class Selectors

- Besides tags, another option for specifying which `ng-content` tag to use is CSS classes
- This can be done by setting the value of the `select` attribute to a class selector such as `.header-content`
- Wrap the desired content in a `<div>` with the matching CSS class to specify content position

```
  <!-- Parent component -->
  <rio-child>
    <div class="header-content">
      <p>This is my header content</p>
    </div>
    <div class="footer-content">
      <p>This is my footer content</p>
    </div>
  </rio-child>
```

```
  <!-- Child Component -->
  <h4>Child Component</h4>
  <ng-content select=".header-content"></ng-content>
  <ng-content select=".footer-content"></ng-content>
```

[View Example](https://plnkr.co/edit/YQTUGbOxhxZ41iKKpTbV?p=preview)

---

## Smart vs Dumb Components

Components can be classified as "smart" or "dumb" depending on how coupled are they to the application


| Characteristic          | Smart Component      | Dumb Component          |
| ----------------------- | -------------------- | ----------------------- |
| Coupled to the app?     | Yes                  | No                      |
| Reusable?               | No                   | Yes                     |
| Aware of the state?     | Yes                  | No                      |
| Component tree location | Top                  | Bottom                  |
| Easy to test?           | No                   | Yes                     |
| A.K.A                   | Container Components | Presentation Components |

---
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

If I want to write a custom UI Component for my project,
which field of the `@NgModule` decorator should I put the class in?

1.  `bootstrap`
1.  `declarations`
1.  `interfaces`
1.  None of the above.

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is "declarations".

---

## Refactoring Hard-to-Test Code (1/3)

Some code is hard to test, and that usually means it's a good opportunity to refactor.

- Keep components from knowing or doing too much
- Minimize reliance on private component methods
- Move dependencies into services so they can be mocked

---

## Refactoring Hard-to-Test Code (2/3)

```ts
export class QuoteComponent implements OnInit {
  quote: string;

  constructor(private http: Http) {}

  private transformQuote(quote) { ... }

  ngOnInit() {
    this.http.get('/api/quotes')
      .map(this.transformQuote.bind(this))
      .subscribe((quote) => {
        this.quote = quote;
      });
  }
}
```

Moving our API call into a service will allow us to mock `getQuote()` and avoid having to mock `Http`

---

## Refactoring Hard-to-Test Code (3/3)

```ts
@Injectable()
export class QuoteService() {
  constructor(private http: Http) {}
  public getQuote() {
    return this.http.get('/api/quotes')
      .map(this.transformQuote.bind(this)).first();
  }
  private transformQuote() { ... }
}
```

```ts
@Component({ ... })
export class QuoteComponent implements OnInit {
  quote: string;
  constructor(private quoteService: QuoteService) {}
  ngOnInit() {
    this.quoteService.getQuote()
      .subscribe((quote) => {
        this.quote = quote;
      });
  }
}
```

---

## Configuring TypeScript Compilation

- Configuration can be on command line but more commonly in `tsconfig.json`
- `target` is the compilation target
- `module` is the target module resolution method
- Decorator support in TypeScript hasn't been finalized yet but since Angular uses decorators extensively, these need to be set to true
- Can use with Webpack via `ts-loader`

```js
{
 "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": false,
    "removeComments": false,
    "sourceMap": true
  },
  "exclude": [
    "node_modules",
    "dist/"
  ]
}
```
