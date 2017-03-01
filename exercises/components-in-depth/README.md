# Components in Depth Exercise

## Step 1

Using the `angular-cli` create a new project called `components-in-depth` inside 
of the `training` folder.

## Step 2

Use the `angular-cli` to create the components by running the following 
commands:

```
ng generate component button-grouping
ng generate component counter-display
```

## Step 3

In `button-grouping.component.ts`, add the following `@Input` property
- counterValue

and the following `@Output` EventEmitters
- onIncrement
- onDecrement

## Step 4

Implement the `increment` method to emit the `onIncrement` event containing the 
`counterValue` incremented by 1.

Implement the `decrement` method to emit the `onDecrement` event containing the 
`counterValue` decremented by 1.

## Step 5

Create two buttons in `button-grouping.component.html` that will call our 
`increment` and `decrement` methods when pressed.

Use `ng-content` inside the buttons such that we can use projection to pass in
custom button text.

## Step 6

Place the following snippet into `counter-display.component.ts`
```ts
import { Component } from '@angular/core';

const defaultCounterValue = 10;

@Component({
  selector: 'app-counter-display',
  templateUrl: 'counter-display.component.html'
})
export class CounterDisplayComponent {
  counterValue: number;
  defaultCounterValue: number = defaultCounterValue;

  ngOnInit() {
    this.setDefaultValue();
  }

  setDefaultValue() {
    this.counterValue = this.defaultCounterValue =
      Number.isInteger(this.defaultCounterValue) ?
      this.defaultCounterValue : defaultCounterValue;
  }
}
```

## Step 7

Place the following snippet into `counter-display.component.html`.
```html
<input type="number" [(ngModel)]="defaultCounterValue">
<button (click)="setDefaultValue()">
  Set default value
</button>

<h4>{{ counterValue }}</h4>
```

Add `<app-button-grouping>` to the bottom of the file and do the following:
- pass in the `counterValue`
- handle the `output` events by setting the `counterValue` to the emitted 
value
- use projection to pass in some text to label our buttons

## Step 8

Add `<app-counter-display></app-counter-display>` to the `app.component.html` 
template.
