<!--
	Correct answer is 3.

  1 - Values emitted are exposed via the `$event` variable
  2 - This answer may expose a misunderstanding that values referenced as callback arguments are class members
	3 - Not choosing this answer may expose confusion in terms of inputs vs. outputs, and/or two-way bound `[()]` properties.
  4 - This answer may expose a misunderstanding that values passed into outputs must be callbacks. In reality, they are simply expressions which also have special handling for callback syntax
-->
Which of the following is invalid syntax for handling an event?

1. `<message (messageSent)="onMessageSent($event)"></message>`
1. `<message (messageSent)="onMessageSent(message)"></message>`
1. `<message (messageSent)="sent"></message>`
1. `<message (messageSent)="sent=$event"></message>`

---

<!--
	Correct answer is 2.

  1, 3, 4 - This answer may expose a misunderstanding of the input `[]` output `()` paradigm and what the syntax represents
-->
What is the difference between:<br>
a) `<counter [count]="count()"></counter>` and<br>
b) `<counter (count)="count()"></counter>`?


1. None, they are both the same
1. a) will pass the resulting value of calling `this.count()` into the `<counter>` component via an input<br>
   b) will call `this.count()` whenever the `<counter>` component emits a value through its own member of type `EventEmitter` called `count`.
1. a) will call `this.count()` whenever the `<counter>` component emits a value through its own member of type `EventEmitter` called `count`<br>
   b) will pass the resulting value of calling `this.count()` into the `<counter>` component via an input.
1. a) will emit a value from the parent into the `<counter>` component from a member of type `EventEmitter` called `count`,<br>
   b) will assign values emitted from the `<counter>` component to `this.count`.

---

<!--
	Correct answer is 4.

	1 - This answer may expose confusion between which component actually handles the vent
  2, 3 - This answer may expose a misunderstanding that both child and parent components are able to listen to the custom event, (thus both log their messages).
-->
Given the following components, which message will be logged to the console when `child`'s button is clicked?

Component declarations:
```typescript
@Component({
  selector: 'parent',
  template: `
    <h2>Parent</h2>
    <child (messageSent)="handleMessageSent($event)"></child>
  `
})
export class Parent {
  @Output() messageSent = new EventEmitter();
  message = 'I am the parent';

  handleMessageSent() {
    console.log(this.message);
  }
}
```
```typescript
@Component({
  selector: 'child',
  template: `
    <h3>Child</h3>
    <button (click)="sendMessage()">Click me</button>
  `
})
export class Child {
  @Output() messageSent = new EventEmitter();
  message = 'I am the child';

  handleMessageSent() {
    console.log(this.message);
  }

  sendMessage() {
    this.messageSent.emit(true);
  }
}
```

1. I am the child
1. I am the parent<br>
   I am the child
1. I am the child<br>
   I am the parent
1. I am the parent

---