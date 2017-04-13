<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Unit Testing

---

## Roadmap

FIXME

---

## Toolchain

- [Jasmine](https://jasmine.github.io/): behavior-driven testing framework
- [Karma](https://karma-runner.github.io/1.0/index.html): test runner
- [Istanbul](https://gotwarlost.github.io/istanbul/): coverage report generator

---

## Running Tests

- `ng test`: lauches a browser for testing and watches for changes.
  - Compiles and re-runs tests as files change
- `ng test --code-coverage`: puts a coverage report in `coverage/` directory

---

## Creating Test Files

- Angular CLI automatically creates test files for components
- Adds `.spec` to test file names so Jasmine and the build system recognize them as tests
- E.g., `src/app/app.component.spec.ts` does basic tests of `AppComponent`

---

## Arrange, Act and Assert with Jasmine

Note the following in the generated tests:

- `describe` explains what the test is
- `beforeEach` runs code before each test
- `it` explains the result we are expecting
- `expect` formulates a scenario
- `toBeTruthy` is a matcher that asserts the expected outcome

---

## Getting Tests to Run

- Run `ng test`: 4 failures
- Have to include our dependencies in `app.component.spec.ts`
  - And in `to-do-list.component.spec.ts`

_src/app/app.component.spec.ts_
```ts
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToDoListComponent,
        GenericInputComponent
      ],
      providers: [
        ToDoService
      ]
    }).compileComponents();
```

---

## Cleaning Up Technical Debt

- Title is now "To Do" instead of "app works!"
- Notice we're no longer passing data to the display in `thingsToDo`,
  so remove it from the HTML and erase the `@Input`

![Auto-Generated Tests Running](content/images/screenshot-jasmine-defaults-run.png)

---

## Testing a Pipe

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

## Instantiate the class in the `beforeEach`

```ts
beforeEach(() => {
  const capitalizePipe = new CapitalizePipe();
});
```

---

## Running `expect` on the transform method

```ts
it('should capitaze a work', () => {
  expect(capitalizePipe.transform('foo')).toEqual('Foo');
});
```

---

## How do I do an isolated component test

---

## Instantiating the component or service

- How would we test the `itemCount` method of this component?

```ts

export class AppComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList();
  }

  itemCount() {
    return this.todoService.todoList.length;
  }
  
}
```

---

## Mocking dependencies

We need an object that matches the shape of `TodoService` to test `AppComponent`.  The component is expecting it to have a `getTodoList` method, and a property called `todoList` with the list of todos.

```ts
mockTodoService = {
  getTodoList: () => {},
  todoList: [{
    label: 'item 1',
    isComplete: false
  }, {
    label: 'item 2',
    isComplete: true
  }]
};
```
In the real service, the `getTodoList` method makes a network request to get some todo and populates the `todoList` property.  For this first test, we don't need `getTodoList` to do anything.

---

## Testing business logic (Or Verifying methods and properties)

- Test component methods by calling them in a test, then checking for expected outcome
- Test properties with assertion statements

```ts

describe('AppComponent', () => {
  let app: AppComponent;
  let mockTodoService;
  beforeEach(() => {
    mockTodoService = {
      getTodoList: () => { },
      todoList: [
        { label: 'item 1', isComplete: false },
        { label: 'item 2', isComplete: true }
      ]
    };
    app = new AppComponent(mockTodoService);
  });
  describe('the itemCount method', () => {
    it('should return the number of todos', () => {
      expect(app.itemCount()).toEqual(2);
    });
  });
});

```

FIXME (update example): [View Example](http://plnkr.co/edit/XUM8Gfz08nfbQf1BhDN1?p=preview)

---

## How do I configure the testing module?

## When to use TestBed
`TestBed` is helpful when:

1. you have logic in your templates and you want to render a component class along with its template for testing.
2. you want to use Angular's injector to handle dependecy injection for you.
3. you want to test how different elements integrate in the Angular runtime.

With `TestBed` we do not instantiate the class we want to test, we let Angular do that for us.  Using the test fixture, Angular will give us the instance it created.

---

## Providing mock dependencies

We can declare `mockTodoService` as we did before and have Angular inject it for us.

```ts
TestBed.configureTestingModule({
  declarations: [ mockTodoService ]
  providers:[
    { provide: TodoService, useValue: mockTodoService }
  ]
})
```

---

## Injecting real providers and spying on their methods

We can have Angular create the real service.  If there are any methods that we want to mock, we can do that through a Jasmine *spy*.  The spy will ensure we are not actaully calling the real method.

Always obtain injected dependencies from TestBed itself so that the spy is set on the instance that is injected and not the object we created.


```ts
TestBed.configureTestingModule({
  declarations: [ AppComponent ]
  providers:[ TodoService ]
});

todoService = TestBed.get(TodoService);
spyOn(todoService, 'getTodoList').and.callFake(() => );
```

---

## Importing real modules from the app

We can import a real module that declares the component and provides the service it depends on.

```ts
TestBed.configureTestingModule({
  imports: [ AppModule ]
})
```

Notes:
This approach of inject actual services, or importing real modules often works, but sometimes Angular is not able to resolve all of the required dependencies.  When we mock things, we have more control, but if mocks get too complicated, they could be harder to maintain.

---

## How do I test a component using ComponentFixture?

Here is how we obtain the instance from the fixutre.

```ts
let fixture: ComponentFixture<AppComponent>;
let comp: AppComponent;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ AppComponent ],
    providers: [
      { provide: TodoService, useValue: mockTodoService }
    ]
  });

  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;
});
```

---

## Change detection

We must tell angular when to run change detection during our tests. We can do that using the fixture:

```ts
fixture = TestBed.createComponent(AppComponent);
fixture.detectChanges()
```

We can indicate that we want **automatic change detection** when cofiguring our test module like this:

```ts
TestBed.configureTestingModule({
  declarations: [ ],
  providers: [
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
});
```

---

## Querying the native element

Once change detection has run, we can check that the expeced output was rendered to the DOM. 

```ts
describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    // TestBed.configureModule({ ...
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should show the number of items', () => {
    de = fixture.debugElement.query(By.css('.qa-todo-count'));
    el = fixture.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Todos: 2');
  });

});
```

---

## How do I deal with asynchronous behaviour in my tests

- The CLI uses the asynchronous function `compileComponents` and it wraps it in the `async` function.
- `compileComponents` is required for testing when classes reference external files through `templateUrls` and `styleUrls`.
- We usually don't need to do this because Webpack will inline our templates and css as part of the build process, but we will often need to use `async` and a similar function `fakeAsync` in our tests.

---

## Running tests in a zone

In Jasmine, we can run asynchronous tests like this:

```ts
it('should...', (done) => {
  myComponent.getData().subscribe(data => {
    expect(data).toEqual({abc: 123});
    done();
  });
});
```

Without `done` the test finishes before the callback is run.

Angular's solution is to run all of our test code inside a zone.js zone where it can track all asynchronous activity and wait for all tasks to complete.

+++

## Zone.js

Zones allow Angular to create execution contexts that track the completion of ansynchronous operations. Zone.js accomplishes this by monkey patching of many common asynchronous methods.

Zones are used in Angular applications to let Angular know when change detection should run, as change detection is often required after asynchronous operations complete.

For more information see https://angular-2-training-book.rangle.io/handout/zones/.

---

## `async`

The same test could be written like this:

```ts
it('should...', async(() => {
  myComponent.getData().subscribe(data => {
    expect(data).toEqual({abc: 123});
  });
}));
```

Angular will wait for the `expect` function to complete.

---

## `fakeAsync`

Here is a test that tests a debounced input  

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

## How do I test services

- When testing services in Angular, we employ many of the same techniques and strategies used for testing components.
- Data is the main emphasis in testing services - are we _getting_, _storing_ and _propagating_ data correctly.

---

## What to test

Typically services will make Https requests, so we will want to:
- verify the contents of the request being made (correct URL)
- ensure that the data we mock is returned by the right method
- ensure that data is being returned in the correct format

---

##  Mocking Angular’s Http services

Suppose we want to test `TodoService`, which uses `Http`'s `get` method:

```ts
export class TodoService {
  public todoList = [];
  constructor(private http: Http) {}
  getTodoList() {
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


## Creating and inject a the mock (1/2)

The backend returns data that looks like this:

```json
{
  "todos": [
    {
      "done": true,
      "id": 1,
      "label": "Wake up in the morning"
    },
    {
      "done": true,
      "id": 2,
      "label": "Grab glasses, go out the door, hit the city"
    }
  ]
}
```

---

## Creating and inject a the mock (2/2)

We can create a light mock of the Http service.

```ts
beforeEach(() => {
  mockHttp = { get: () => { } };

});
```

We then create a spy for its `get` method and return an observable similar to what the real Http service would do and instantiate the service.

```ts
  spyOn(mockHttp, 'get').and.returnValue(Observable.of({
    json: () => [
      { 'done': false, 'id': 1, 'label': 'item 1' },
      { 'done': true, 'id': 2, 'label': 'item 2' }
    ]
  }));

  todoService = new TodoService(mockHttp);
});
```

---

## Asserting on the request and response

This method still allows us to check to see that the service has requested the right URL, and that it returns that expected data.

```ts
it('should have the list of todos', () => {
  todoService.getTodoList();
  expect(todoService.todoList.length).toBe(2);
});
```

FIXME: update this example [View Example](http://plnkr.co/edit/eplM1SETfR51USVZLUlU?p=preview)
