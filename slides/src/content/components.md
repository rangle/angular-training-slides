# Components In Angular 2

---

## Example Structure of a component

![Angular 2 App Structure](content/images/angular2-generic-application-structure.png)

Notes:

- An app is a collection of Modules
- An app has only one root module
- An app can have multiple feature modules
- An app uses built-in modules to have access to 
- A module defines a collection of Components, Directives, Pipes and Services
- There's different types of modules: root, feature, built-in and third party modules.

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