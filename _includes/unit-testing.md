<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="unit-testing" -->
## Building Applications with Angular

# Unit Testing

---
<!-- .slide: id="unit-testing-roadmap" -->

## Roadmap

1. What tools should I use to test Angular applications?
1. Where should I put my tests?
1. How can I write and run simple tests?
1. How do I test a pipe?
1. How do I create an isolated unit test for a component or service?
1. How can I create mock objects for dependencies?
1. When do I use TestBed and how do I configure it?
1. What testing utilities do I use with TestBed?
1. How do I do shallow rendering to test a component?
1. How can I query native HTML elements?
1. How do I run change detection during my test?
1. How do I deal with asynchronous functions in my tests?
1. How I test a service that depends on Http?
1. How do I use a spy to mock a method and check that the correct parameters are passed?

---
<!-- .slide: id="unit-testing-toolchain" -->
## Toolchain

- [Jasmine](https://jasmine.github.io/): behavior-driven testing framework
- [Karma](https://karma-runner.github.io/1.0/index.html): test runner
- [Istanbul](https://gotwarlost.github.io/istanbul/): coverage report generator
- [karma-spec-reporter](https://github.com/mlex/karma-spec-reporter): provides clean reports in terminal
  - install with `npm install karma-spec-reporter --save-dev`
  - in `karma.config` change reporters: `reporters: ['spec']`

---
<!-- .slide: id="unit-testing-running-tests" -->
## Running Tests

- `ng test` or `yarn test`: launches a browser for testing and watches for changes
  - Compiles and re-runs tests as files change
- `ng test --code-coverage`: puts a coverage report in `coverage/` directory

---
<!-- .slide: id="unit-testing-creating-test-files" -->
## Creating Test Files

- Angular CLI automatically creates test files for components
- Adds `.spec` to test file names so Jasmine and the build system recognize them as tests
- E.g., `src/app/app.component.spec.ts` does basic tests of `AppComponent`

---
<!-- .slide: id="unit-testing-arrange-act-assert" -->
## Arrange, Act and Assert with Jasmine

Note the following in the generated tests:

- `describe` explains what the test is
- `beforeEach` runs code before each test
- `it` explains the result we are expecting
- `expect` formulates a scenario
- `toBeTruthy` is a matcher that asserts the expected outcome

---
<!-- .slide: id="unit-testing-testing-a-pipe" -->
## Testing a Pipe

- `ng generate pipe capitalize`

#### _src/app/capitalize.pipe.ts_
```ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(inputText: string, args?: any): string {
    return inputText.charAt(0).toUpperCase() + inputText.slice(1);
  }
}
```

---
<!-- .slide: id="unit-testing-starter-code" -->
## Starter Code for Testing

#### _src/app/capitalize.pipe.spec.ts_
```ts
import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });
});
```

---
<!-- .slide: id="unit-testing-instantiate-pipe" -->
## Instantiate the Pipe in `beforeEach`

- We will need an instance for each test, so instantiate it in the `beforeEach` to avoid duplicating code

#### _src/app/capitalize.pipe.spec.ts_
```ts
describe('CapitalizePipe', () => {

  let pipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  // ...instance creation test as before...

}
```

- Have to declare `pipe` outside `beforeEach` so that it will be visible in test functions

---
<!-- .slide: id="unit-testing-add-a-test" -->
## Add a Test

- We several broken tests that we'll simply ignore for now
  - Use `fdescribe` to tell Jasmine to "**f**ocus" on this test so we don't see the other failing tests
- Here we use the `toEqual` Jasmine matcher which performs a deep equality check
  - The `toBe` matcher, which performs a strict equality check (`===`), would also work here

#### _src/app/capitalize.pipe.spec.ts_
```ts
fdescribe('CapitalizePipe', () => {

  // ...as before...

  it('should capitalize a word', () => {
    expect(pipe.transform('foo')).toEqual('Foo');
  });
}
```

---
<!-- .slide: id="unit-testing-instantiating-component--or-service" -->
## Instantiating the Component or Service

- We currently do not display the number of todos in `AppComponent`
- Let's create a method that will return the number of todos
- Start by removing existing test code until we have the shell of a simple test for this component

#### _src/app/app.component.spec.ts_
```ts
import { AppComponent } from './app.component';

fdescribe('AppComponent', () => {
  beforeEach(() => {
    // ...
  });

  it('should count the number of items', () => {
    // ...
  });
});
```

---
<!-- .slide: id="unit-testing-mocking-dependencies" -->
## Mocking Dependencies

- We need an object that matches the "shape" of `TodoService` to test `AppComponent`
- Note the use of `as` to assert the type of our mock
- The mock object must have an `addItem` method and `items` property
- `addItem` doesn't actually need to do anything
- `items` should be an array of fake todos

```ts
let mockToDoService: ToDoService;

mockToDoService = {
  addItem: null,
  items: ['item 1', 'item 2', 'item 3']
} as ToDoService;
```

- We can manually provide this to `AppComponent` by passing it to the constructor

---
<!-- .slide: id="unit-testing-testing-business-logic" -->
## Testing Business Logic

- Here we write a failing test
- Next, we'll create the method in `AppComponent` that will make this test pass

#### _src/app/app.component.spec.ts_
```ts
  describe('the itemCount method', () => {

    let comp: AppComponent;
    const mockToDoService;

    beforeEach(() => {
      mockToDoService = {
        addItem: () => {},
        items: ['item 1', 'item 2', 'item 3']
      };
      comp = new AppComponent(mockToDoService);
    });

    it('should return the number of items', () => {
      expect(comp.itemCount()).toEqual(3);
    });
  });
```

---
<!-- .slide: id="unit-testing-when-to-use-testbed" -->
## When to Use TestBed

- `TestBed` is a class that creates a real Angular runtime for the purposes of testing Angular elements
- It is helpful when:
  1. you have logic in your templates and you want to render a component class along with its template for testing
  2. you want to use Angular's injector to handle dependency injection for you
  3. you want to test how different elements integrate in the Angular runtime

<!-- comment needed to separate lists -->

- We do not instantiate the class we want to test when using `TestBed`
  - We let Angular do that for us
- Using the test fixture, Angular will give us the instance it created

---
<!-- .slide: id="unit-testing-configure-the-test-module" -->
## Configuring the Test Module

- We can declare `mockToDoService` as we did before and have Angular inject it for us
- TestBed will also instantiate the `AppComponent` and inject the dependency for us
  - But we must add it to the `declarations` array

#### _src/app/app.component.spec.ts_
```ts
TestBed.configureTestingModule({
  declarations: [ AppComponent ],
  providers:[
    { provide: ToDoService, useValue: mockToDoService }
  ]
})
```

---

<!-- .slide: id="unit-testing-testing-components-using-componentfixture" -->
## Testing Components Using ComponentFixture

- `ComponentFixture` is a testing utility that gives us access and control over the things we are testing
- The `componentInstance` property of the fixture is an instance of `AppComponent`.
  - Here, we assign to to the `comp` variable to be used later in our tests

#### _src/app/app.component.spec.ts_
```ts
let fixture: ComponentFixture<AppComponent>;
let comp: AppComponent;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ AppComponent ],
    providers: [
      { provide: ToDoService, useValue: mockToDoService }
    ]
  });

  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;
});
```

---

<!-- .slide: id="unit-testing-shallow-rendering" -->
## Shallow Rendering

- The above test fails because `AppComponent` uses components which we have not declared
- We could provide mocks for these components, or do a shallow render by adding the `CUSTOM_ELEMENTS_SCHEMA`

#### _src/app/app.component.spec.ts_
```ts
TestBed.configureTestingModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
```

Notes:

- `NO_ERRORS_SCHEMA` is also commonly used for shallow rendering

---
<!-- .slide: id="unit-testing-providing-the-real-service" -->
## Providing the Real Service

- Alternatively, we can have Angular create the real service
- We can then use `TestBed` to get a reference to the injected instance and set some state

#### _src/app/app.component.spec.ts_
```ts
TestBed.configureTestingModule({
  declarations: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers:[ ToDoService ]
});

const toDoService = TestBed.get(ToDoService);
toDoService.items = ['item 1', 'item 2', 'item 3'];
```

---
<!-- .slide: id="unit-testing-importing-the-real-module" -->
## Importing the Real Module

- We can import the real module that declares the component and provides the service it depends on

```ts
TestBed.configureTestingModule({
  imports: [ AppModule ]
});
```

---
<!-- .slide: id="unit-testing-querying-native-elements" -->
## Integration Testing by Querying Native Elements

- Importing the `AppModule`, override the `ToDoService` by providing the mock as before
- We can use the `debugElement` to query the generated DOM
- The test fails because we changed the data in the service after the component was created and the view hasn't detected it

#### _src/app/app.component.spec.ts_
```ts
describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    // TestBed.configureModule({ ...
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should show all todo items', () => {
    const el = fixture.debugElement.query(By.css('ul'));
    expect(el.children.length).toEqual(3);
  });
});
```

---
<!-- .slide: id="unit-testing-change-detection" -->
## Change Detection

- We must tell Angular when to run change detection during our tests
- The `ComponentFixture.detectChanges` method makes this possible
- Our test should now pass


_src/app/app.component.spec.ts_
```ts
it('should show all todo items', () => 
fixture.detectChanges();
// ...
```

---
<!-- .slide: id="unit-testing-automatic-change-detection" -->
## Automatic Change Detection

- We can indicate that we want *automatic change detection* when configuring our test module

_src/app/app.component.spec.ts_
```ts
TestBed.configureTestingModule({
  declarations: [ ],
  providers: [
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
});
```

---

<!-- .slide: id="unit-testing-dealing-with-async" -->
## Dealing With Asynchronous Behavior in Tests

- Angular tests generated by the CLI use the asynchronous function `compileComponents` and wrap it in the `async` function
- `compileComponents` is required for testing when classes reference external files through `templateUrls` and `styleUrls`
- We usually don't need to do this
  - Webpack will inline our templates and css as part of the build process
  - But we will often need to use `async` and a similar function `fakeAsync` in our tests

---
<!-- .slide: id="unit-testing-running-tests-in-a-zone" -->
## Running Tests in a Zone

- Jasmine can run asynchronous tests like this:

```ts
it('should...', (done) => {
  myComponent.getData().subscribe(data => {
    expect(data).toEqual({abc: 123});
    done();
  });
});
```

- Without `done` the test finishes before the callback is run
- Angular's solution is to run all of our test code inside a [Zone.js](https://github.com/angular/zone.js) zone
  where it can track all asynchronous activity and wait for all tasks to complete

---
<!-- .slide: id="unit-testing-zone-js" -->
## Interlude: Zone.js

- Zones allow Angular to create execution contexts that track the completion of asynchronous operations
- [Zone.js](https://github.com/angular/zone.js) accomplishes this by monkey patching many common asynchronous methods
- Zones are used in Angular applications to let Angular know when change detection should run
  - Since change detection is often required after asynchronous operations complete

---
<!-- .slide: id="unit-testing-using-async" -->
## Using `async`

- The `async` function can be used to test asynchronous functions
- The same test could be written as:

```ts
it('should...', async(() => {
  myComponent.getData().subscribe(data => {
    expect(data).toEqual({abc: 123});
  });
}));
```

- Angular will now wait for the `expect` function to complete

---
<!-- .slide: id="unit-testing-using-fakeasync" -->
## Using `fakeAsync`

- This test tests debouncing *without* actually waiting for hundreds of milliseconds
  - Assumes `comp` has been assigned a component to test

```ts
it('should debounce change to search query for 300 ms', fakeAsync(() => {
  spyOn(comp.queryChanged, 'emit');
  comp.onChange('abc');
  tick(100);
  expect(comp.queryChanged.emit).not.toHaveBeenCalled();
  tick(200);
  expect(comp.queryChanged.emit).toHaveBeenCalledWith('abc');
}));
```

---
<!-- .slide: id="unit-testing-testing-services" -->
## Testing Services

- Test services in Angular using many of the same techniques and strategies used for testing components
- Main emphasis in testing services is data
  - Are we *getting*, *storing*, and *propagating* data correctly?
- Services will typically make HTTP requests, so we will want to:
  - Verify the contents of the request being made (correct URL)
  - Ensure that the data we mock is returned by the right method
  - Ensure that data is being returned in the correct format

---
<!-- .slide: id="unit-testing-testing-http" -->
##  ToDoService with HTTP

- Suppose we want to test a version of `ToDoService` that uses `Http`

```ts
@Injectable()
export class ToDoService {
  public todoList = [];
  constructor(private http: Http) { }

  getProducts() {
    return this.http.get('http://localhost:3000/todos')
      .map(response => response.json())
      .map(item => item.map(todo => this.getTodoTaskForDisplay(todo.label, todo.done, todo.id)))
      .subscribe(todos => this.todoList = todos);
  }

  getTodoTaskForDisplay(label, isComplete, id) {
    return {
      id,
      label,
      isComplete
    };
  }
}
```

---
<!-- .slide: id="unit-testing-light-http-mock" -->
## Providing a Light HTTP Mock

- A light mock can be used in place of the actual Http service
- Note the use of `as` to assert the type of our mock
- A Jasmine spy provides the mock implementation of the get method

```ts
describe('toDoService', () => {
  let toDoService: ToDoService;
  let mockHttp: Http;

  beforeEach(() => {
    mockHttp = { get: null } as Http;
    spyOn(mockHttp, 'get').and.returnValue(Observable.of({
      json: () => [
        { id: 1, label: 'first', done: false },
        { id: 2, label: 'second', done: true }
      ]
    }));
    toDoService = new ToDoService(mockHttp);
  });
  ```

---
<!-- .slide: id="unit-testing-asserting-method" -->
## Assert that the Method Retrieves Data

- The following test checks that the `getData` method assigns the correct data in the correct format to the `toDoList` property

```ts
  it('should return data in correct format', () => {

    toDoService.getProducts();

    expect(toDoService.todoList).toEqual([
      { id: 1, label: 'first', isComplete: false },
      { id: 2, label: 'second', isComplete: true }
    ]);

  });
  ```

---
<!-- .slide: id="unit-testing-spying-to-check-url" -->
## Using the Spy to Check the URL

- The following test checks that the correct URL is being used

```ts
it('should be called with http://localhost:3000/todos', () => {
  toDoService.getProducts();
  expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:3000/todos');
});
```
