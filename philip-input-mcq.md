<!--
	Correct answer is 3.

	1 - This answer may expose confusion between the directionality of inputs vs. outputs.
  2 - While this is certainly a valid way to share data, the data in this case is not being handed down from a parent component requiring our input component to be "smarter" than it needs to be.
-->
What is the best way that a component can support receiving data passed into it from a parent component?

1. A member decorated with `@Output`
1. A service injected into both components
1. A member decorated with `@Input`

---

<!--
	Correct answer is 1.

  2 - May expose confusion in the what `message="Greeting"` is actually doing. It does not imply a "global" member assignment, and values are not "inherited" or otherwise made available to child components implicitly
  3 - May expose a confusion in the directionality of the `message="Greeting"` assignment. In this case the parent is passing the string "Greeting" down into the child component. Not the other way around.

-->
Given the following components and usage, what resulting text would be rendered to the screen?

Component declarations:
```typescript
@Component({
  selector: 'parent',
  template: `
    <div>Parent: {{ message }}</div>
    <child message="Greetings"></child>
  `
})
export class Parent {
  @Input() message: string;
}
```
```typescript
@Component({
  selector: 'child',
  template: `<div>Child: {{ message }}</div>`
})
export class Child {
  @Input() message: string;
}
```

1. Parent:<br>
   Child: Greetings
1. Parent: Greetings<br>
   Child: Greetings
1. Parent: Greetings<br>
   Child:

---

<!--
	Correct answer is 1.

	2 - May expose confusion between the differences in `[]` notation, and passing data as a string.
  3 - May expose confusion between the differences between input `[]` notation and output/event `()` notation.
  4 - May expose confusion with what interpolation is/does and not understanding that it's not required here.
-->
How can an object reference be passed down into a child component input called `data` from the parent's template?

1. `[data]="myData"`
1. `data="myData"`
1. `(data)="myData"`
1. `[data]="{{myData}}"`

---

<!--
	Correct answer is 3.

  1, 2 - This may expose confusion in that we're required to pass in a reference to a class member (or that we can pass multiple class members in at once) whereas `[]` notation really means we're evaulating an expression which can actually be anything.
	4 - If no single quotes (`'`) were used this would be the case, however `[]` notation will evaluate the passed value as an expression (in the context of the component). In this case, `[message]` will evaluate to a string;
-->
Given the following component and usage, what resulting text would be rendered to the screen?

Component declaration:
```typescript
@Component({
  selector: 'hal',
  template: `<div>{{ message }}</div>`
})
export class Hal9000 {
  @Input() message: string;
}
```

Usage:
```html
<hal [message]="'Hello, Dave. You're looking well today'"></hal>
```

1. [object Object]
1. Nothing, the words/grammar are not valid class members
1. Hello, Dave. You're looking well today
1. None. An error will be thrown because Angular will attempt to parse the message as an object

---