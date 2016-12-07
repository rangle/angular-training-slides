# Creating a Hello World Application

---

## Example Structure of an Angular 2 App

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

- Collection of components, directives, pipes and services (aka elements)
- Provide a mechanism to group related pieces of functionality within our application
- There are 4 types of modules:
  - The root module (there's only one in an app)
  - Feature modules (optional)
  - Built-in modules (`BrowserModule`, `FormsModule`, etc.)
  - Third party modules (`AngularMaterial`)
- An Angular 2 application is a collection of modules, starting from the root module
- Modules can import other modules to extend functionality

---

## Structure of a Module

```ts
import { NgModule } from '@angular/core';

@NgModule({
  imports:      [ ... ],
  declarations: [ ... ],
  providers:    [ ... ],
  exports:      [ ... ],
  bootstrap:    [ ... ]
})
export class MyModule {}
```

- `imports`: Other modules required by our module (built-in, feature or third party)
- `declarations`: Components, directives and pipes defined in our module
- `providers`: Services defined in our module
- `exports`: Components, directives or pipes available for other modules
- `bootstrap`: The root component of the application

---

## Structure of a Root Module

```ts
@NgModule({
  imports:      [ BrowserModule, MyFeatureModule, ThirdPartyModule ],
  declarations: [ RootComponent, OtherComponent, MyPipe, MyDirective ],
  providers:    [ MyService ],
  bootstrap:    [ RootComponent ]
})
export class AppModule {}
```

- The root module is always called `AppModule`
- The root module doesn't use the property `exports`
- There's only one root module in an application
- Only the root module defines the property `bootstrap`
- The root module always imports the `BrowserModule`
- The `BrowserModule` exports common elements of the framework (`NgIf`, `NgFor`, etc.)

---

## Structure of a Feature Module

```ts
@NgModule({
  imports:      [ CommonModule, OtherFeatureModule ],
  declarations: [ MyComponent, MyPipe, MyDirective ],
  providers:    [ MyService ],
  exports:      [ MyComponent, MyDirective ]
})
export class MyFeatureModule {}
```

- All declared elements are private by default
- To make an element public we need to add it to the `exports` array
- There's no root component in a feature module
- Services are public by default
- Beware of how the dependency injection works!

---

## Root Module Example

_app.module.ts_

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

- Always follow the filename convention:
  - `AppModule` => _app.module.ts_
  - `SharedModule` => _shared.module.ts_

---

## Basic Structure of a Component

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-widget',
  styles: ['p { color: red }'],
  template: '<p>I\'m a widget!</p>'
})
export class WidgetComponent { ... }
```

- `selector`: The HTML tag associated with the component

```html
<rio-widget></rio-widget>
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

- `template`: The user facing side of the component
  - Usually HTML but it can be other language depending on the platform
- `styles`: An array of styles to apply to the template
  - By default styles only apply to the component (~shadow root)

[View Example](https://plnkr.co/edit/oQt4n7r6droc2aczAFbO?p=preview)

---

## Comments on Components

- Always define a prefix for every component of your application
  - Avoid colisions with third party components and future native HTML elements
- The prefix has usually 3 letters:

```ts
selector: 'rio-widget' // rio = Rangle.io
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

- We can use backticks to define multiline templates and styles

```ts
template: `
  <h1>My Title</h1>
  <p>My Paragraph</p>
`
```

```ts
styles: [`
  p {
    color: red;
  }
`]
```

---

## A Simple Angular 2 Folder Structure

```sh
.
├── dist
│   └── ...
├── src
│   ├── app
│   │   ├── app.module.ts
│   │   ├── index.ts
│   │   └── root.component.ts
│   ├── index.html
│   └── main.ts
└── ... 
```

- Leave the root folder for configuration files
- Put all our code in the _src_ folder
- After a build, the bundle files will be created in the _dist_ folder
- Always create one folder per module
- Create import barrels with files called _index.ts_

---

## Folder Structure (With Config Files)

```sh
.
├── src
│   ├── app
│   │   └── ...
│   └── ...
├── package.json
├── tsconfig.json
└── webpack.config.js
```

- Config files needed for:
  - NPM => _package.json_
  - Webpack => _webpack.config.json_ 
  - Typescript => _tsconfig.json_

---

## Bootstrapping an Application

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

- The function used to bootstrap an application depends on the target platform
- Other platforms can be the server (Angular Universal) or a smartphone (Nativescript)
- There are two types of bootstrapping:
  - Just in time compilation (JIT)
  - Ahead of time compilation (AOT)
- Calling `enableProdMode` modifies how the change detection works

---

## JIT vs AOT

| Characteristic        | JIT          | AOT               |
| --------------------- | ------------ | ----------------- |
| Compilation target    | Browser      | Server            |
| Compilation context   | Runtime      | Build             |
| Bundle size           | Huge (~3 MB) | Smaller (~400 KB) |
| Execution Performance | -            | Better            |
| Startup time          | -            | Shorter           |

- AoT compiles component templates in the server
- With AoT the compiler is not shipped to the browser

---

## Loading an App Using Webpack

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Angular 2 App</title>
</head>
<body>
  <rio-app>Loading...</rio-app>
</body>
</html>
```

---

## Loading an App Using SystemJS

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Angular 2 App</title>
  <script src="https://unpkg.com/systemjs@0.19.38/dist/system.src.js"></script>
  <script src="https://code.angularjs.org/tools/typescript.js"></script>
  <script src="system.config.js"></script>
</head>
<body>
  <rio-app>Loading...</rio-app>
  <script>
    System.import('main.ts');
  </script>
</body>
</html>
```

---

## Multiple Ways to Define a Component

```ts
// Inline style
@Component({
  selector: 'rio-app',
  styles: ['p { color: red }'],
  template: '<p>Hello</p>'
})
```

```ts
// Webpack style
@Component({
  selector: 'rio-app',
  styles: [require('./app.component.css')],
  template: require('./app.component.html')
})
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

```ts
// SystemJS & Angular CLI & AoT style
@Component({
  selector: 'rio-app',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
```

[View Example](https://plnkr.co/edit/s1jcJH9YuODcMEDWPLYU?p=preview)

Notes:

- SystemJS style loads assets at runtime
- Webpack style bundle assets together
- Webpack style is similar to inline style

---

## Components With External Files

Create folders to group related files of a component

```sh
src
├── app
│   ├── app.module.ts
│   ├── index.ts
│   └── root
│       ├── root.component.css
│       ├── root.component.html
│       └── root.component.ts
├── index.html
└── main.ts
```

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

```ts
@Component({
  selector: 'rio-header',
  template: '<p>The header</p>'
})
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

```ts
@Component({
  selector: 'rio-body',
  template: '<rio-message></rio-message>'
})
```

```ts
@Component({
  selector: 'rio-message',
  template: '<p>The Message</p>'
})
```

---

## Component Tree (Diagram)

![Component Tree](content/images/component-tree.jpg)

---

## Registering Components in the Module

```ts
// Import your components here ...

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    BodyComponent,
    MessageComponent
  ],
  bootstrap: [
    RootComponent
  ]
})
export class AppModule {}
```

- All the components used have to be defined in the module