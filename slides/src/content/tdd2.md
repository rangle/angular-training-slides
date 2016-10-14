# Intro to Test Driven Development

---

## Simple Test

```
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

## Testing Components

- `@angular/core/testing` module uses Jasmine with Chai for syntax sugar
- Some Angular-specific additions

---

## Verifying Methods and Properties

- Test component methods by calling them in a test, then checking for expected outcome
- Test properties with assertion statements

```
clearMessage() {
  this.message = '';
}
```
can be tested with:
```
it('should clear message', () => {
  app.clearMessage();
  expect(app.message).toBe('');
});
```

---

## Injecting Dependencies and DOM Changes
- Use Angular2's `TestBed` utility to provide mock dependencies
- Create a `fixture` to use in our tests

```
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

## Injecting Dependencies and DOM Changes
- `fixture` provides us with a new instance of our component
- Can be used to query the DOM rendered by a component
- Can also change component properties
```
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

## Injecting Dependencies and DOM Changes
- Provide real or mock dependencies with `TestBed`
- Create a `fixture` to test the component with
- Wrap in `async` to run in asynchronous test zone where all async functions have resolved prior to ending the test
- `detectChanges` to run change detection
- `debugElement` to access underlying DOM elements

---

## Testing Asynchronous Actions
- `fakeAsync` lets us simulate the passage of time using `tick`
- Lets us test asynchronous behaviour with synchronous functions

```
getQuote() {
  this.quoteService.getQuote().then((quote) => {
    this.quote = quote;
  });
};
```

```
it('Should get quote', fakeAsync(() => {
  fixture.componentInstance.getQuote();
  tick();
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('div').innerText).toEqual('Test quote');
}));
```

---

## Refactoring Hard-to-Test Code

- If your code is hard to test, refactor it
- Consider moving component code into services and focusing on service tests
