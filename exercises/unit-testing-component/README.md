# Unit Testing a Component

_app.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>My Simple Component</h2>
    <p>{{ getMessage() + ' here' }}</p>
  `
})
export class AppComponent {
  getMessage(): string {
    return 'Insert a dummy message';
  }
}
```

Create unit tests for the component to verify that:

1. When calling the method `getMessage` it should return the string `Insert a dummy message`
2. When the component is rendered, the text `Insert a dummy message here` is shown in the template inside a paragraph

## Step 1

Using the `angular-cli` create a new project called `unit-testing-component` inside of the `training` folder.

## Step 2

Update the auto-generated `app.component.ts` to match the code shown above.

## Step 3

In the auto-generated `app.component.spec.ts` remove the existing code

## Step 4 

Create a first test with `describe()`, `it()`, and `expect()` for the first step (test the return of `getMessage()`).  Note: since this is just testing a method of a class it doesn't require any Angular specific test set

## Step 5

Create a second test with `describe()`, `beforeEach()`, `it()`, `TestBed`, and `expect()` to test the second step (template rendering).  This portion will require some test set-up to work with the Angular component/template, and will require working with the text fixture to find and verify the generated html content.