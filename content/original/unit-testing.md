<!-- .slide: data-background="../content/images/title-slide.jpg" -->
# Unit Testing

---

## The Testing Toolchain

Our testing toolchain will consist of the following tools:

- Jasmine - most popular testing framework in the Angular community
- Karma - controls the execution of our tests
- PhantomJS - a headless DOM instance
- Istanbul - generates coverage reports

---

## Filename Conventions

We will put our test scripts alongside the files they are testing, adding `.spec` to the filename to mark it as a test.

```sh
.
├── src
│   ├── app
│   │   ├── foo.component.ts
│   │   ├── foo.component.spec.ts
│   │   └── ...
│   └── ...
└── ...
```

You can put test scripts anywhere you like, but keeping them close to your source files makes them easier to find.

---

## Typings

In order to use write tests in TypeScript, we need TypeScript type definitions for Chai and Jasmine. We can include these type definitions from `@types` with npm.

```sh
npm install @types/jasmine @types/assertion-error
```

---

## Executing Test Scripts

To run our tests we run Karma from the command line. Karma can be installed globally or locally (recommended)

```sh
npm install karma -g
karma start
```

This will set up the testing environment and run through each unit test, as well as run any reporters we've configured.

A good practice is to amalgamate all the project's task/build commands through npm. In `package.json`:

```json
...
"scripts": {
    "test": "karma start",
    ...
}
...
```

---

## Testing Components

- `@angular/core/testing` module uses a modified version of Jasmine
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
export class AppComponent {
  quote: string;

  constructor(private quoteService: QuoteService) {};

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
  declarations: [ AppComponent ],
  providers: [ QuoteService ],
  bootstrap: [ AppComponent ]
})
export class QuoteModule {}
```

---

## Injecting Dependencies and DOM Changes (4/5)

The following creates and configures a `TestBed` module.

It also defines `fixture` as a test component.

```ts
let fixture: ComponentFixture<AppComponent>;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ AppComponent ],
    providers: [
      { provide: QuoteService, useClass: MockQuoteService }
    ]
  });

  fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
});
```

---

## Injecting Dependencies and DOM Changes (5/5)

- `fixture` provides us with a new instance of our component
- Can also change component properties and detect changes

```ts
it('Should render the mocked response in its template', async(() => {
  fixture.componentInstance.getQuote();

  fixture.whenStable()
    .then(() => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('div'));

      expect(de.nativeElement.textContent).toBe('Test quote')
    });
}));
```

---

## Injecting Dependencies and DOM Changes Summary

- Provide real or mock dependencies with `TestBed`
- Create a `fixture` to test the component with
- Wrap in `async` to run in asynchronous test zone where all async functions have resolved prior to ending the test
- `detectChanges` to run change detection
- `debugElement` to access underlying DOM elements

[View Example](https://plnkr.co/edit/TrwmTD1Y3NTq3PZGFHx6?p=preview)

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
  public message = '';

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
- Lets us test asynchronous behavior with synchronous functions

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

## Testing Services

- When testing services in Angular, we employ many of the same techniques and strategies used for testing components.
- Data is the main emphasis in testing services - are we _getting_, _storing_ and _propagating_ data correctly.

---

## Testing Strategy for Services

When testing services we'll be mocking out fake data with fake requests.

Why? If we test a service that actually sends HTTP requests to a real server:

- No isolation between the testing of our service and any other outside points of failure: our service may work, but if the API server is failing or giving values we aren't expecting, it may give the impression that our service is the one failing.
- Performance issue: as a project grows and the number of unit tests increase, running through a large number of tests that make HTTP requests will take a long time and may put strain on the API server.

Note that for the mocking services, we usually need to manually inject their dependencies through `TestBed`, because they are usually outside Angular's own bootstrap process.

---

## Testing HTTP Requests

For async services, the key point is to verify the contents of the request being made (correct URL) and ensure that the data we mock into the service is returned correctly by the right method. For [example](http://plnkr.co/edit/K9gzDOcEOcmfFaOacdKZ?p=preview), suppose we want to test `SearchWiki`:

```ts
export class SearchWiki {
  constructor (private http: Http) {}
  search(term: string): Observable<any> {
    return this.http.get(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&srsearch=' + term
    ).map((response) => response.json());
  }
  searchXML(term: string): Observable<any> {
    return this.http.get(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&format=xmlfm&srsearch=' + term
    );
  }
}
```

---

## Defining a Mock Response

Our testing strategy will be to check to see that `SearchWiki` has requested the right URL, and once we've responded with mock data like `mockResponse` we want to verify that it returns same data:

```json
const mockResponse = {
  "batchcomplete": "",
  "continue": {
    "sroffset": 10,
    "continue": "-||"
  },
  "query": {
    "searchinfo": {
      "totalhits": 36853
    },
    "search": [{...}]
  }
};
```

So, how to properly mock this process?

---

## HTTP Mocking Strategy (1/2)

An alternative to using `MockBackend` is to create our own light mocks and tell TypeScript to treat it as Http using type assertion.

```ts
beforeEach(() => {
  mockHttp = { get: null } as Http;
```

We then create a spy for its get method and return an observable similar to what the real Http service would do.

```ts
  spyOn(mockHttp, 'get').and.returnValue(Observable.of({
    json: () => mockResponse
  }));
  TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [{ provide: Http, useValue: mockHttp}, SearchWiki]
  });
});
```

---

## HTTP Mocking Strategy (2/2)

This method still allows us to check to see that the service has requested the right URL, and that it returns that expected data.

```ts
it('should get search results', fakeAsync(
   inject([SearchWiki], searchWiki => {
     const expectedUrl = 'https://en.wikipedia.org/w/api.php?' +
       'action=query&list=search&srsearch=Angular';

     searchWiki.search('Angular')
       .subscribe(res => {
         expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
         expect(res).toEqual(mockResponse);
       });
   })
 ));
```

[View Example](http://plnkr.co/edit/eplM1SETfR51USVZLUlU?p=preview)
