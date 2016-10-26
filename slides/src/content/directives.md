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

## NgStyle Directive (1/2)

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

[View Example](https://plnkr.co/edit/Vcpt1vDWryaiYcmoQEyC?p=preview)

---

## NgStyle Directive (2/2)

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

## NgClass Directive (1/4)

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

## NgClass Directive (2/4) - String

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

[View Example](https://plnkr.co/edit/uYihwapmBxNaqGDeawwS?p=preview)

---

## NgClass Directive (3/4) - Array

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

[View Example](https://plnkr.co/edit/uYihwapmBxNaqGDeawwS?p=preview)

---

## NgClass Directive (4/4) - Object

```ts
@Component({
  selector: 'class-as-string',
  template: `
    <p 
      [ngClass]="{'centered-text': isCentered, underlined: isUnderlined}" 
      class="orange">
    </p>`,
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

[View Example](https://plnkr.co/edit/0xrwGT?p=preview)   

---

## Structural Directives

- Handles how a component or native element renders using the `<template>` tag
- Have their own special syntax in the template `*myDirective`

```html
<p *ngIf="isVisible">I'm sometimes visible</p>
```

- No square bracket, still an expression binding
- Uses the special tag `<template>` to delay rendering

```html
<p *myDirective="expression">Hello</p>
```

Is equivalent to:

```html
<template [myDirective]="expression">
  <p>Hello</p>
</template>
```

- Angular 2 built-in structural directives: `ngIf`, `ngFor`, `ngSwitch`

---


## NgIf Directive

- Conditionally renders components or elements based on an expression
- Removes or recreates a portion of the DOM tree
- Be aware of the cost of creating/destroying DOM elements

```html
<button type="button" (click)="toggleExists()">Toggle Component</button>
<if-example *ngIf="exists">Hello</if-example>
```

```ts
@Component({ ... })
export class AppComponent {
  exists = true;

  toggleExists() { 
    this.exists = !this.exists;
  }
}
```

[View Example](https://plnkr.co/edit/MTyYN0ntm1BNKE20HT7a?p=preview)

---

## NgFor Directive

- Mechanism to define multiple chunks of UI at once based on an iterable
- The internal variable of the iteration (`item`) is scoped in the template
- Similar syntax of a `for...of` statement

```html
<ol>
  <li *ngFor="let item of list">
    <span>({{ item.id }})</span>
    <span>{{ item.value }}</span>
  </li>
</ol>
```

```ts
@Component({ ... })
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

Provides some other values that can be bound to: `index`, `first`, `last`, `even`, `odd`

```html
<for-example 
  *ngFor="let episode of episodes; let i = index; let isOdd = odd"
  [episode]="episode"
  [ngClass]="{ odd: isOdd }">
  {{i+1}}. {{episode.title}}
</for-example>
```

```ts
@Component({ ... })
export class AppComponent {
  episodes: any[] = [
    { title: 'Winter Is Coming', director: 'Tim Van Patten' },
    // ... more objects
  ];
}
```

[View Example](https://plnkr.co/edit/8PcjEr5aOwoVSNe2Gowb?p=preview)

Notes:

- You might want to talk about trackBy 

---

## NgSwitch Directive

- Very similar to a switch statement
- Multiple components can be matched using ngSwitchCase
- Since components are created or destroyed be aware of the costs in doing so.

```html
<div class="tabs-selection">
  <tab [active]="isSelected(1)" (click)="setTab(1)">Tab 1</tab>
  <tab [active]="isSelected(2)" (click)="setTab(2)">Tab 2</tab>
</div>
<div [ngSwitch]="tab">
  <tab-content *ngSwitchCase="1">Tab content 1</tab-content>
  <tab-content *ngSwitchCase="2">Tab content 2</tab-content>
  <tab-content *ngSwitchDefault>Select a tab</tab-content>
</div>
```

```ts
@Component({ ... })
export class AppComponent {
  tab = 0;
  setTab(num: number) { this.tab = num; }
  isSelected(num: number) { return this.tab === num; }
}
```

[View Example](https://plnkr.co/edit/MEG6RBlrF82kWNYxwFlk?p=preview)

---

## Using Multiple Structural Directives
   
A component or native element can only be bound to one directive at a time

```html
<!-- Not allowed -->
<div *ngFor="[1,2,3,4,5,6]" *ngIf="item > 3">
  {{item}}
</div>
```

We need to use the alternative syntax using the `<template>` tag

```html
<!-- Allowed -->
<template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
  <div *ngIf="item > 3">
    {{item}}
  </div>
</template>
```

[View Example](https://plnkr.co/edit/gmIbP6s7S1pN7vDk9YHG?p=preview)