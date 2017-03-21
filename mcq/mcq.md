# Slide 54

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

# Slide 62

## How to define styles when defining a component?

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

# Slide 74

## `@Input` is used to:

1. Pass data into another component
2. Capture data passed from another component
3. Display an HTML `<input>` element

<!--
1. student is confused between @Input and @Output
2. correct answer
3. student is confused between a template and a decorator
-->

# Slide 86

## What are the different options for specifying which `ng-content` tags to use?

1. `<ng-content select=".header-content"></ng-content>`
2. `<ng-content select="header"></ng-content>`
3. `<div>{{header-content}}</div>`

<!--
1. correct
2. correct
3. student confused with other frameworks
-->

# Slide 96

## Whis are valid structural directives? Choose every answer that is correct:

1. `<p *ngIf="isVisible">Hello</p>`
2. `<p [ngIf]="isVisible">Hello</p>`
3. `<p (ngIf)="isVisible">Hello</p>`
4. `<p [(ngIf)]="isVisible">Hello</p>`

<!--
1. correct
2. correct
3. incorrect, parens are used for event binding
4. incorrect, banana boxes are used for two-way data binding
-->

# Slide 108

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

# Slide 129

## Which are the correct ways for binding variables to an Angular form?

1. `<input name="firstName" [ngModel]="firstName">`
2. `<input name="firstName" (ngModel)="firstName">`
3. `<input name="firstName" [(ngModel)]="fistName">`

<!--
1. correct
2. student is confused with parens vs brackets data binding
3. correct
-->

# Slide 160

## How to run the tests on a project?

1. `karma start`
2. `chai start`
3. `jasmine start`
4. `phantomjs start`

<!--
1. correct
2. chai is an assertion library, not a test runner
3. jasmine is a testing framework, not a test runner
4. phatomjs is a headless, scriptable browser API, not a test runner
-->

# Slide 188

## In redux, a store is comparable to ..... in a server architecture:

1. a client API
2. a store
3. a service

<!--
1. student is confused with the presentational view/a client API
2. correct
3. student is confused with observables/function invocation
-->
