# Intro to Test Driven Development

---

## Testing Components

- `@angular/core/testing` module uses Jasmine with Chai for syntax sugar
- Angular Testing Utilities provide functions that let you control your testing environment, e.g. `TestBed`
- `karma` is used to run the unit tests

---

## Simple Test

```ts
describe('Testing math', () => {
  it('multiplying should work', () => {
    expect(4 * 4).toEqual(16);
  });
});
```

- `describe` explains what the test is
- `it` explains the result we are expecting
- `expect` formulates a scenario
- `toEqual` asserts the expecting outcome
- Always write tests to PASS assertions

---

## Verifying Methods and Properties (1/3)

- Test component methods by calling them in a test, then checking for expected outcome
- Test properties with assertion statements

---

## Verifying Methods and Properties (2/3)

How would we test `clearMessage()`?

```ts
export class MessageComponent {
  public message: string = 'Hello!';

  constructor() {}

  clearMessage() {
    this.message = '';
  }
}
```

---

## Verifying Methods and Properties (3/3)

```ts
describe('Testing message state in message.component', () => {
  let app: MessageComponent;

  beforeEach(() => {
    app = new MessageComponent();
  });

  it('should clear message', () => {
    app.clearMessage();
    expect(app.message).toBe('');
  });
});
```

[View Example](http://plnkr.co/edit/XUM8Gfz08nfbQf1BhDN1?p=preview)

---

## Injecting Dependencies and DOM Changes (1/5)
Angular2 components often have services that deliver asynchronous data as dependencies. 

We can use Angular2's `TestBed` utility to provide mock dependencies before each test.

We can then create a `fixture` to use in our tests, which will let us query the DOM rendered by a component.

---

## Injecting Dependencies and DOM Changes (2/5)

How would we test this component?

```ts
export class QuoteComponent {
  quote: string;

  constructor(private quoteService: QuoteService){};

  getQuote() {
    this.quoteService.getQuote().then((quote) => {
      this.quote = quote;
    });
  };
}
```

---

## Injecting Dependencies and DOM Changes (3/5)

Using `TestBed` lets us create a test module to test this component. 

This is what a normal module might look like:
```ts
@NgModule({
  imports: [ BrowserModule ],
  declarations: [ QuoteComponent ],
  providers: [ QuoteService ],
})
export class QuoteModule {}
```

---

## Injecting Dependencies and DOM Changes (4/5)
The following creates and configures a `TestBed` module.

It also defines `fixture` as a test component.

```ts
let fixture;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [
      QuoteComponent
    ],
    providers: [
      { provide: QuoteService, useClass: MockQuoteService }
    ]
  });
  fixture = TestBed.createComponent(QuoteComponent);
  fixture.detectChanges();
});
```

---

## Injecting Dependencies and DOM Changes (5/5)
- `fixture` provides us with a new instance of our component
- Can also change component properties and detect changes

```ts
it('Should get quote', async(inject([], () => {
    fixture.componentInstance.getQuote();
    fixture.whenStable()
    .then(() => {
      fixture.detectChanges();
      return fixture.whenStable();
    })
    .then(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('div').innerText).toEqual('Test quote');
    });
})));
```

---

## Injecting Dependencies and DOM Changes Summary
- Provide real or mock dependencies with `TestBed`
- Create a `fixture` to test the component with
- Wrap in `async` to run in asynchronous test zone where all async functions have resolved prior to ending the test
- `detectChanges` to run change detection
- `debugElement` to access underlying DOM elements


[View Example](http://plnkr.co/edit/7KZu1Yg6kBX7rksrpRHV?p=preview)

---

## Overriding Dependencies for Testing (1/3)
`TestBed` provides the ability to override dependences that are used in a test:

- `overrideModule`
- `overrideComponent`
- `overrideDirective`
- `overridePipe`

---

## Overriding Dependencies for Testing (2/3)
Suppose we want to override a component's template for testing:

```ts
@Component({
  selector: 'display-message',
  template: `
    <div>
      <div>
        <h1>{{message}}</h1>
      <div>
    </div>
  `
})
export class MessageComponent {
  public message: string = '';

  setMessage(newMessage: string) {
      this.message = newMessage;
  }
}
```

---

## Overriding Dependencies for Testing (3/3)
Here we simplify the template:

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [MessageComponent],
    providers: []
  });

  fixture = TestBed.overrideComponent(MessageComponent, {
    set: {
      template: '<span>{{message}}</span>'
    }})
    .createComponent(MessageComponent);

  fixture.detectChanges();
});
```

[View Example](http://plnkr.co/edit/P4tkaUYBFcHGvoTZjKnB?p=preview)

---

## Testing Asynchronous Actions (1/2)
- `fakeAsync` lets us simulate the passage of time using `tick`
- Lets us test asynchronous behaviour with synchronous functions

Recall our `QuoteComponent`

```ts
export class QuoteComponent {
  quote: string;

  constructor(private quoteService: QuoteService){};

  getQuote() {
    this.quoteService.getQuote().then((quote) => {
      this.quote = quote;
    });
  };
}
```

---

## Testing Asynchronous Actions (2/2)

```ts
it('Should get quote', fakeAsync(() => {
  fixture.componentInstance.getQuote();
  tick();
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('div').innerText).toEqual('Test quote');
}));
```

[View Example](http://plnkr.co/edit/W7zHfjFvEGYW0BBNdQlU?p=preview)

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

  constructor(private _http: Http) {}

  private transformQuote(quote) { ... }

  ngOnInit() {
    this._http.get('/api/quotes').toPromise()
    .then((quote) => {
      this.quote = quote;
      this.transformQuote(quote);
    })
  }
}
```

---

## Refactoring Hard-to-Test Code (3/3)
Moving our API call into a service will allow us to mock `getQuote()` and avoid having to mock `Http`

```ts
@Injectable()
export class QuoteService() {
  constructor(private _http: Http) {}

  public getQuote() {
    return this._http.get('/api/quotes').toPromise();
  }

  public transformQuote() { ... }
}
```

