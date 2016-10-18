##Testing Services
- When testing services in Angular 2, we employ many of the same techniques and strategies used for testing components.
- Data is the main emphasis in testing services - are we _getting_, _storing_ and _propagating_ data correctly.

---

##Testing Strategy for Services
When testing services we'll be mocking out fake data with fake requests.

Why? If we test a service that actually sends HTTP requests to a real server:
- No isolation between the testing of our service and any other outside points of failure: our service may work, but if the API server is failing or giving values we aren't expecting, it may give the impression that our service is the one failing.
- Performance issue: as a project grows and the number of unit tests increase, running through a large number of tests that make HTTP requests will take a long time and may put strain on the API server.

Note that for the mocking services, we usually need to manually inject their dependencies through `TestBed`, because they are usually outside Angular's own bootstrap process.

---
##Testing HTTP Requests
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
##Testing HTTP Requests Using MockBackend (1/3)
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
##Testing HTTP Requests Using MockBackend (2/3)
First, we need to mock out our HTTP services (to avoid sending actual HTTP requests).
```ts
beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        SearchWiki
      ]
    });
  });
```
- Angular 2 provides us with a `MockBackend` class that can be configured to provide mock responses to our requests, without actually making a network request.
- `useClass` recipe makes Angular inject `MockBackend` to `XHRBackend` declarations.

---
##Testing HTTP Requests Using MockBackend (3/3)
Real test case:
```ts
it('should get search results', fakeAsync(
  inject([ XHRBackend, SearchWiki],
    (mockBackend: XHRBackend, searchWiki: SearchWiki) => {
    const expectedUrl = 'https://en.wikipedia.org/w/api.php?' +
      'action=query&list=search&srsearch=Angular';
    mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(expectedUrl);
        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockResponse })
        ));
      });
    searchWiki.search('Angular')
      .subscribe(res => { expect(res).toEqual(mockResponse);});
  })
));
```

---
##Alternative HTTP Mocking Strategy (1/2)
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
##Alternative HTTP Mocking Strategy (2/2)
Real test case:
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
- This method still allows us to check to see that the service has requested the right URL, and that it returns that expected data.

---
##Executing Tests Asynchronously
Since services operate in an asynchronous manner, it may be useful to execute a service's entire unit test asynchronously.
- Performance improvement: a particular long unit test will not block other unit tests from executing.

```ts
describe('verify search', () => {
  it('searches for the correct term',
    fakeAsync(inject([SearchWiki, MockBackend], (searchWiki, mockBackend) => {
        return new Promise((pass, fail) => {
          ...
        });
    })));
});
```
- `fakeAsync` fulfills dependencies and execute the test in an asynchronous process.
