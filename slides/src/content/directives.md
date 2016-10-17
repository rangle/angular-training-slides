# Directives

---

## What are directives?

- Directives are entities that **change the behavior** of components
- Components are just directives with templates
- Directives can be applied to native elements or custom components

There are two types of directives:

- **Attribute directives:** Changes the behavior of a component whitout affecting its template (NgClass, NgStyle)
- **Structural directives:** Changes the behavior of a component by modifying its template (NgIf, NgFor)

---

## NgStyle Directive

Directive that modifies the "style" attribute of a component

```ts
@Component({
  selector: 'style-example',
  template: `
    <p style="padding: 1rem"
      [ngStyle]="{
        color: 'red',
        'font-weight': 'bold',
        borderBottom: borderStyle
    }">
      <ng-content></ng-content>
    </p>
  `
})
export class StyleExampleComponent {
  borderStyle: string = '1px solid black';
}
```

---

## NgStyle Directive

NgStyle is a directive with a property selector "[ngStyle]"

```ts
@Directive({
  selector: [ngStyle]
})
```

It has an input property called "ngStyle" which expects an object

```ts
class NgStyleDirective {
  @Input() ngStyle: SomeShape;
}
```

The object accepts CSS properties in kebab case or camel case

```ts
'font-weight': ... // kebab case
borderBottom: ... // camel case
```

The final style it's going to be a combination of the style attribute and [ngStyle]

```html
<p style="padding:1rem; color:red; font-weight:bold; border:1px solid black">

```

---

## NgClass Directive

- Changes the "class" attribute of the host component
- The NgClass directive can be used with strings, arrays or objects

```ts
@Component({
  selector: 'class-as-string',
  template: '<p ngClass="centered-text underlined" class="orange"></p>',
  styles: [ ... ]
})
export class ClassAsStringComponent {}
```

Resulting class attribute:

```html
<p class="orange centered-text underlined"></p>
```

---

## NgClass Directive (String)

Used with a string:

```ts
@Component({
  selector: 'class-as-string',
  template: '<p ngClass="centered-text underlined" class="orange"></p>',
  styles: [ ... ]
})
export class ClassAsStringComponent {}
```

Or using a string property

```ts
@Component({
  selector: 'class-as-string',
  template: '<p [ngClass]="classes" class="orange"></p>',
  styles: [ ... ]
})
export class ClassAsStringComponent {
  classes = 'centered-text underlined';
}
```

---

## NgClass Directive (Array)

Used with an array:

```ts
@Component({
  selector: 'class-as-string',
  template: `
    <p [ngClass]="['centered-text', 'underlined']" class="orange"></p>
  `,
  styles: [ ... ]
})
export class ClassAsStringComponent {}
```

Or using an array property

```ts
@Component({
  selector: 'class-as-string',
  template: '<p [ngClass]="classes" class="orange"></p>',
  styles: [ ... ]
})
export class ClassAsStringComponent {
  classes = ['centered-text', 'underlined'];
}
```

---

## NgClass Directive (Object)

```ts
@Component({
  selector: 'class-as-string',
  template: `
    <p 
      [ngClass]="{
        'centered-text': isCentered, 
        underlined: isUnderlined
      }" 
      class="orange">
    </p>
  `,
  styles: [ ... ]
})
export class ClassAsStringComponent {
  isCentered = true;
  isUnderlined = false;
}
```

Result:

```html
<p class="orange centered-text"></p>
```

---

## Structural Directives

Handles how a component or element renders using the `<template>` tag   
- No square bracket, still an expression binding
- Have their own special syntax in the template

Angular 2 built-in structural directives:
* ngIf
* ngFor
* ngSwitch;    

---

## Structural Directives (Example)

```ts
@Component({
  selector: 'directive-example',
    template: `
      <p *structuralDirective="expression">
        Under a structural directive.
      </p>
    `
})
```

Is equivalent to 

```ts
@Component({
  selector: 'directive-example',
  template: `
    <template [structuralDirective]="expression">
      <p>
        Under a structural directive.
      </p>
    </template>
    `
})
```

---


## NgIf Directive

Conditionally renders components or elements based on an expression
- Removes or recreates a portion of the DOM tree 
- If the component has expensive create/destroy action, be aware of the costs in using it

```ts
@Component({
  selector: 'app',
  template: `
    <button type="button" (click)="toggleExists()">Toggle Component</button>
    <if-example *ngIf="exists">
      Hello
    </if-example>  
  `
})
export class AppComponent {
  exists: boolean = true;
  toggleExists() { 
    this.exists = !this.exists;
  }
}
```

[View Example](https://plnkr.co/edit/MTyYN0ntm1BNKE20HT7a?p=preview)

---

## NgFor Directive

A way of repeating a template
- Lets you specify an iterable object to iterate over and the name to refer to each item by inside the scope
- Similar syntax to for...of statement

```ts
@Component({
  selector: 'app-root',
  template: `<ol>
    <li *ngFor="let item of list">
      <span>({{ item.id }})</span>
      <span>{{ item.value }}</span>
    </li>
  </ol>`,
  styles: [``]
})
export class AppComponent {
  list = [
    { id: 0, value: 'zero the hero' },
    // ... more objects
  ];
}
```

[View Example](https://plnkr.co/edit/vtYGE5LosH5Rs4L7PMmM?p=preview)

---

## NgFor Directive (exported values)

Provides some other values that can be bound to: [index, first, last, even, odd]

```ts
@Component({
  selector: 'app',
  template: `
    <for-example 
      *ngFor="let episode of episodes; let i = index; let isOdd = odd"
      [episode]="episode"
      [ngClass]="{ odd: isOdd }">
      {{i+1}}. {{episode.title}}
    </for-example>
  `
})
export class AppComponent {
  episodes: any[] = [
    { title: 'Winter Is Coming', director: 'Tim Van Patten' },
    // ... more objects
  ];
}
```

[View Example](https://plnkr.co/edit/8PcjEr5aOwoVSNe2Gowb?p=preview)

Notes: 
You might want to talk about trackBy 

---

## NgSwitch Directive

- Very similar to a switch statement
- Multiple components can be matched using ngSwitchCase
- Since components are created or destroyed be aware of the costs in doing so.

```ts
@Component({
  selector: 'app',
  template: `   <div class="tabs-selection">
                  <tab [active]="isSelected(1)" (click)="setTab(1)">Tab 1</tab>
                  <tab [active]="isSelected(2)" (click)="setTab(2)">Tab 2</tab>
                </div>
                <div [ngSwitch]="tab">
                  <tab-content *ngSwitchCase="1">Tab content 1</tab-content>
                  <tab-content *ngSwitchCase="2">Tab content 2</tab-content>
                  <tab-content *ngSwitchDefault>Select a tab</tab-content>
                </div> `,
  styles: [...]
})
export class AppComponent {
  tab: number = 0;
  setTab(num: number) { this.tab = num; }
  isSelected(num: number) { return this.tab === num; }
}
```

[View Example](https://plnkr.co/edit/MEG6RBlrF82kWNYxwFlk?p=preview)

---

## Using Multiple Structural Directives

When we want to combine multiple structural directives together   
- A template can only be bound to one directive at a time. 

```ts
@Component({
  selector: 'app',
  template: `
    <template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
      <div *ngIf="item > 3">
        {{item}}
      </div>
    </template>
  `
})
export class AppComponent {}
```

[View Example](https://plnkr.co/edit/gmIbP6s7S1pN7vDk9YHG?p=preview)

---

## Built-in Directives

---

## Custom Directives

_highlight.directive.ts_

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[rio-highlight]',
  export class HighlightDirective {
    constructor(el: ElementRef, renderer: Renderer) {
       renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
  }
})
```

```html
<rio-message [rio-highlight]></rio-message>
```


