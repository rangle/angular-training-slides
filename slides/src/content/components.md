# Components In Angular 2

- The core concept of any Angular 2 application is the component.
- In effect, the whole application can be modeled as a tree of these components.
- A component controls a patch of screen real estate that we could call a view, and declares reusable UI building blocks for an application.

---

## Passing Data into a Component

- The inputs attribute defines a set of parameters that can be passed down from the component's parent
- For example, we can modify the Hello component so that name can be configured by the parent

```ts
@Component({
  selector: 'hello',
  template: '<p>Hello, {{name}}</p>'
})
export class Hello {
  @Input() name: string;
}
```

---

- The point of making components is encapsulation and reusability
- Inputs allow us to configure a particular component instance

```html
<!-- To bind to a raw string -->
<hello name="World"></hello>
<!-- To bind to a variable in the parent scope -->
<hello [name]="name"></hello>
```

---

## Responding to Component Events

---

## Angular 2 Modules

- Are a collection of components, directives, pipes and services (aka elements)
- Provide a mechanism to group related pieces of functionality within our application
- There are 4 types of modules:
  - The root module (there's only one in an app)
  - Feature modules (optional)
  - Built-in modules (BrowserModule, FormsModule, etc.)
  - Third party modules (AngularMaterial)
- An Angular 2 application is a collection of modules, starting from the RootModule
- Modules can import other modules to extend functionality

---

## Loading the App in the Browser

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Angular 2 Exercise</title>
</head>
<body>
  <rio-root></rio-root>
</body>
</html>
```

---

## Exercise 2

Plain text exercise

---

## Component Tree (Code)

```ts
@Component({
  selector: 'rio-root',
  template: `
    <rio-header></rio-header>
    <rio-body></rio-body>`
})
```

---

## MD IMAGE

Markdown image here

![Component Tree](content/images/component-tree.jpg)