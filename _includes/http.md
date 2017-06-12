<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="http" -->
## Building Applications with Angular

# The HTTP Service

---
<!-- .slide: id="http-roadmap" -->
## Roadmap

1. How does Angular interact with HTTP?
1. How can I get data from a server?
1. How can I send data to a server?

---
<!-- .slide: id="http-http-service" -->
## The Built-in `Http` Service

- Service provided by Angular to perform REST operations
- Has a method for each HTTP verb: `get`, `post`, `put`, `delete`
- Each method returns an `Observable` that emits a single value
- Connections are closed automatically after the value is emitted

---
<!-- .slide: id="http-importing" -->
## Importing the Service

- Angular CLI automatically imports `HttpModule` in `app.module.ts`

```ts
import { HttpModule } from '@angular/http';

@NgModule({
  //...other content...
  imports: [
    //...other imports...
    HttpModule
  ],
  //...other content...
})
export class AppModule {}
```

<!-- preview: https://plnkr.co/edit/l4n2upSueYw5UbFjZB1C?p=preview -->

---
<!-- .slide: id="http-json-server" -->
## Interlude: Setting Up a JSON Data Server

- Use [JSON Server](https://github.com/typicode/json-server) to set up a little JSON store
- `npm install json-server --save`
- Create the file shown below in `src/db.json`
- `./node_modules/.bin/json-server --watch src/db.json`
- Go to <http://localhost:3000/items> to test

_src/db.json_
```ts
{
  "items": [
    {"id": 0, "text": "Learn JavaScript"},
    {"id": 1, "text": "Learn Node"},
    {"id": 2, "text": "Learn Angular"}
  ]
}
```

---
<!-- .slide: id="http-using-on-startup" -->
## Using the HTTP Service on Startup

- Modify `AppComponent` to ask `ToDoService` to initialize itself

#### _src/app/app.component.ts_
```ts
import { Component, OnInit } from '@angular/core';
// ...as before...

export class AppComponent implements OnInit {
  // ...as before...
  constructor(
    private toDoService: ToDoService
  ) {
  }

  ngOnInit() {
    this.toDoService.initialize();
  }
}
```

- Get a compiler error (since `toDoService.initialize` isn't defined yet)

---
<!-- .slide: id="http-fetching-data-1" -->
## Fetch Data From the Server

#### _src/app/to-do.service.ts_
```ts
export class ToDoService {

  baseUrl: string = 'http://localhost:3000';

  initialize() {
    const url = `${this.baseUrl}/items`;
    this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        (body) => { 
          this.items = body.map(item => item.text);
          this.changes.next(this.items);
        },
        (err) => { console.log(err); }
      );
  }
}
```

---
<!-- .slide: id="http-fetching-data-2" -->
## Fetch Data From the Server

1. In real applications, `baseUrl` will be a configuration parameter.
1. Define `url` to point to the root of your REST API
1. Use the `http` service to GET that URL...
1. ...then use `map` to extract the JSON body from the result...
   - This is `Observable.map` on one item, not `Array.map` on many
1. ...then use `subscribe` to handle the (single) notification from the observable
   - If all goes well, extract the text of the to-do list using `body.map`
   - If there's an error, report it

<!-- comment needed to separate lists -->
- Note: JSON Server requires us to:
  1. Store lists as objects with an `id` field
- Which is why we need to use `body.map` to extract the text only

---
<!-- .slide: id="http-sending-data" -->
## Send Data to Server

#### _src/app/to-do.service.ts_
```ts
  addItem(item: string) {
    const url = `${this.baseUrl}/items`;
    this.http
      .post(url, { 'text': item })
      .map(res => res.json())
      .subscribe(
        (res) => {
          if (res) {
            this.items.push(res);
            this.changes.next(this.items);
          }
        },
        (err) => { console.log(err); }
        );
  }
```

- Note structure of data sent to server (required by JSON Server)
  - JSON Server will automatically insert the `id`
- Only handle error returns in `subscribe`