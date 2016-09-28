
# Interpolation

---

## Using Properties, Methods and Statements

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Interpolation</h1>
    <p>Property: {{ message }}</p>
    <p>Method: {{ getMessage() }}</p>
    <p>Statement: {{ 3 + 4 }}</p>
  `
})
export class AppComponent {
  message = 'Message from property';
  getMessage() {
    return 'Message from method';
  }
}
```

[View Example](http://localhost:4200/examples/2.0-interpolation/index.html)

Notes:

- JS statements can also be interpolated
- Public and private properties/methods can be used
- It is a good practice to define as "public" any property/method used in the template 

---

# Events

---

## The (click) Event

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Events</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <p>{{ counter }}</p>`
})
export class AppComponent {
  counter = 0;
  increment() { this.counter += 1 }
  decrement() { this.counter -= 1 }
}
```

Notes:

- Events allow flow of data from the template to the class
- Events use the special syntax ()
- Any standard event can be used: mouseover, mouseleave, keydown, etc
- We can pass the special object $event to get more info
- We can create our own custom events

---

# Structural Directives

---

## ngIf

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleVisibility()">{{ label }}</button>
    <p *ngIf="isVisible">Am I visible?</p>`
})
export class AppComponent {
  label = 'Hide';
  isVisible = true;

  toggleVisibility() {
    if (this.isVisible) {
      this.isVisible = false;
      this.label = 'Show';
    } else {
      this.isVisible = true;
      this.label = 'Hide';
    }
  };
}
```

---

## ngFor

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ol>
      <li *ngFor="let item of list">
        <span>({{ item.id }})</span>
        <span>{{ item.value }}</span>
      </li>
    </ol>
  `
})
export class AppComponent {
  list = [
    { id: 0, value: 'zero the hero' },
    { id: 1, value: 'first the worst' },
    { id: 2, value: 'second the best' }
  ];
}
```

---

# Attribute Directives

---

## ngClass

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleVisibility()">{{ label }}</button>
    <p [ngClass]="{ hidden: !isVisible }">Am I visible?</p>
  `,
  styles: [`
    .hidden { 
      display: none; 
    }
  `]
})
export class AppComponent {
  ...
}
```

[View Example](http://localhost:4200/examples/4.1-ng-if/index.html)

---

# Services

---

## Using Services to Get Data

_app.component.ts_

```ts
import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';

@Component({
  selector: 'app-root',
  template: `
    <ol>
      <li *ngFor="let item of list">
        <span>({{ item.id }})</span>
        <span>{{ item.value }}</span>
      </li>
    </ol>`
})
export class AppComponent implements OnInit {
  list = [];
  constructor(private listService: ListService) {}
  ngOnInit() {
    this.list = this.listService.getList();
  }
}
```

---

## Service Definition

_list.service.ts_

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class ListService {
  getList() {
    return [
      { id: 0, value: 'zero the hero' },
      { id: 1, value: 'first the worst' },
      { id: 2, value: 'second the best' }
    ];
  }
}
```

---

## Registering a Service in a Module

_app.module.ts_

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListService } from './list.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

# Component Tree

---

## Nesting a Component

_app.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Component Tree</h1>
    <p>Root Component</p>
    <rio-message></rio-message>`
})
export class AppComponent {}
```

---

## The Child Component

_message.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-message',
  template: '<p>I have a message for you</p>'
})
export class MessageComponent {}
```

---

## Declaring the Components in the Module

_app.module.ts_

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    MessageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

# Exercise

---

# Bindings

---

## Unidirectional Data Flow

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Bindings</h1>
    <div>
      Configurable Input:
      <input [type]="inputType" [value]="label">
    </div>
    <div>
      Label The Input:
      <input type="text" (change)="changeLabel($event)">
      Change The Input:
      <select (change)="changeType($event)">
        <option value="text" selected>text</option> 
        <option value="password">password</option> 
        <option value="button">button</option> 
      </select>
    </div>
`,
})
export class AppComponent {
  inputType: string = 'text';
  label: string = 'configurable';

  changeLabel(event) {
    this.label = event.target.value;
  }

  changeType(event) {
    this.inputType = event.target.value;
  }
}
```

[View Example](http://localhost:4200/examples/7.0-bindings/index.html)

---

# Inputs

---

## Passing Values to Nested Components

```ts
import {Component} from '@angular/core';
export {CustomComponent} from './custom.component';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Components with Inputs</h1>
    <rio-custom value="Hello World!"></rio-custom>
  `,
})
export class AppComponent {}
```

---

## Capturing Values with @Input

```ts
import {Component, Input} from '@angular/core';

@Component({
  selector: 'rio-custom',
  template: '{{ value }}',
})
export class CustomComponent {
  @Input() value;
}
```

[View Example](http://localhost:4200/examples/8.0-inputs/index.html)

---

# Output

---

## Listening to Custom Events

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Outputs</h1>
    <rio-clickable (action)="onAction($event)"></rio-clickable>
    <span>{{ output }}</span>
  `
})
export class AppComponent {
  output: string = '';
  onAction(data) {
      this.output += data + ' ';
  }
}
```

---

## Defining Custom Events with @Output

```ts
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'rio-clickable',
  template: `
    <button (click)="action.emit(text)">Click</button>
    <input type="text" [value]="text" (change)="changeText($event)">
  `,
})
export class ClickableComponent {
  @Output() action = new EventEmitter<string>();
  text: string = '';
  changeText(event) {
    this.text = event.target.value;
  }
}
```

[View Example](http://localhost:4200/examples/9.0-outputs/index.html)

---

# Two Way Data Bindings

---

## The "Banana in a Box" Syntax

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Two Way Data Binding</h1>
    <rio-child [(value)]="parentValue"></rio-child>
    <div>Parent Value: {{ parentValue }}</div>
`,
})
export class AppComponent {
  parentValue: string = 'two way binding';
}
```

---

## Child Component

```ts
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rio-child',
  template: `
    <input [value]="value" 
      (keyup)="valueChange.emit($event.target.value)"> 
  `,
})
export class ChildComponent {
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
```

[View Example](http://localhost:4200/examples/10.0-two-way-binding/index.html)
