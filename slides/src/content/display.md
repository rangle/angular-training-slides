<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Displaying Data

---

## Roadmap

1. Where do I put static data in a component?
1. How do I display multiple values?
1. How do I make items findable?
1. How do I control what is displayed?
1. When does Angular update its display of data?

---

## Make the Data

- Change the title
- Add a list of strings

_src/app/app.component.ts_
```ts
@Component({
  …as before…
}
export class AppComponent {
  title = 'To Do';
  thingsToDo = [
    'Learn JavaScript',
    'Learn Angular',
    'Learn Redux'
  ];
}
```

---

## Display the Data

- Use `*ngFor` to repeat some HTML multiple times
- The loop variable `item` is created locally

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p *ngFor="let item of thingsToDo">{{item}}</p>
```

![ngFor Output](content/images/screenshot-ngfor.png)

---

## Make Items Findable

- Giving each item a unique ID allows bookmarking and testing

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
```

- Use developer tools to view elements:

```html
<p _ngcontent-rsi-0 ng-reflect-id="0" id="0">(0) Learn JavaScript</p>
```

- And yes, we should use `<ul>` and `<li>`…

---

## Nothing to See Here, Folks

- Use `*ngIf` to control whether or not something is displayed
  - More precisely, whether or not something is added to the DOM
  - See how to show and hide content with styles later

_src/app/app.component.ts_
```ts
export class AppComponent {
  …as before…
  thingsCompleted = [];
}
```

---

## Nothing to See Here, Folks

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
<p *ngIf="thingsCompleted.length == 0">Nothing completed</p>
```

![ngIf Output](content/images/screenshot-ngif.png)

---

## Dynamic Content

- Interpolated expressions can include function and method calls

_app/component/app.component.ts_
```ts
export class AppComponent {
  …as before…
  summary(): string {
    return `${this.thingsToDo.length} done / ${this.thingsCompleted.length} to do`;
  }
}
```

_app/component/app.component.html_
```html
<h1>{{title}}</h1>
<p>Summary: {{summary()}}</p>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
<p *ngIf="thingsCompleted.length == 0">Nothing completed</p>
```

---

## Dynamic Content

![Interpolating Method Call](content/images/screenshot-method.png)

---

## Dynamic Content

- Angular notices data changes and updates page according
- Show this by adding a to-do item to the list every second

_app.component/app.component.ts_
```
export class AppComponent {
  …as before…
  constructor() {
    setInterval(() => {
      this.thingsToDo.push('make coffee');
    }, 1000);
  }
}
```

---

## Dynamic Content

- Both the list and the summary update every second

![Dynamic Updating](content/images/screenshot-dynamic.png)
