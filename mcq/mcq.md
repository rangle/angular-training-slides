# Slide 54 (structure of a function module)

```
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  // missing code
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## What is the missing code?

1. `imports: [BrowserModule, FormsModule], declarations: [AppComponent]`

2. `imports: [AppComponent], declarations: [BrowserModule, FormsModule]`

3. `imports: [NgModule, BrowserModule, FormsModule, AppComponent], exports:
   [AppModule]`

4. `imports: [BrowserModule, FormsModule], declarations: [AppComponent],
   exports: [AppComponent]`

# Slide 62 (component definition/styles property)

## What is one way to define styles when creating a component?

1. `styles: ['p { color: green }']`

2. `template: ['app.component.css']`

3. `styleUrls: 'app.component.css'`

4. `template: ['p { color: green }']`

<!-- 
1. correct answer
2. student confused template and styleUrls
3. student didn't notice that Urls is plural, thus an array of css URLs is
   required
4. student confused between the roles of a template vs a style
--> 

# Slide 86 (components in depth/creating a template variable)

## Choose all of the following which are valid options for selecting content with `ng-content`?

1. `<ng-content select=".header-content"></ng-content>`
2. `<ng-content select="header"></ng-content>`
3. `<div>{{header-content}}</div>`

<!--
1. correct
2. correct
3. student confused with other frameworks
-->

# Slide 96 (directives/ngStyle)

## Which are valid structural directives? Choose every answer that is correct:

1. `<p *ngIf="isVisible">Hello</p>`
3. `<p (ngIf)="isVisible">Hello</p>`
4. `<p [(ngIf)]="isVisible">Hello</p>`

<!--
1. correct
2. incorrect, parens are used for event binding
3. incorrect, banana boxes are used for two-way data binding
-->

# Slide 114 (Services/registering)

## How do you register a service in a module?

1. Using the `import` property
2. Using the `export` property
3. Using the `providers` property

<!--
1. student is confused with modules vs services
2. student is confused with the difference between service and making
   components available to other modules
3. correct
-->

# Slide 129 (ngForms/binding)

## Which are the correct ways for binding variables to an Angular form?

1. `<input name="firstName" [ngModel]="firstName">`
2. `<input name="firstName" (ngModel)="firstName">`
3. `<input name="firstName" [(ngModel)]="fistName">`

<!--
1. correct
2. student is confused with parens vs brackets data binding
3. correct
-->

# Slide 166  (Testing)

## Which of the following tools can be used to run tests in a project?

1. `karma`
2. `chai`
3. `jasmine`
4. `phantomjs`

<!--
1. correct
2. chai is an assertion library, not a test runner
3. jasmine is a testing framework, not a test runner
4. phatomjs is a headless, scriptable browser API, not a test runner
-->

# Slide 194 (redux vs server architecture)

## In redux, a store is comparable to ..... in a server architecture:

1. a client API
2. a database
3. a service

<!--
1. student is confused with the presentational view/a client API
2. correct
3. student is confused with observables/function invocation
-->
