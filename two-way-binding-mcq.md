<!--
	Correct answer is 3.

  1 - This may expose a misunderstanding of class member declarations in typescript
  2 - This answer may expose a misunderstanding between the implicit behaviour of the `@Input()` decorator and having to explicitly construct and assign an `EventEmitter` to a member decorated with `@Output()`. It may be assumed that by decorating something as an output you should achieve the expected behaviour
  4 - This may expose confusion between the relationship of the property names and that suffixing an output member name with `Change`
-->
What needs to be added to the following component declaration in order for this markup to be valid `<clock [(time)]="currentTime"></clock>`:

```typescript
@Component({
  selector: 'clock',
  template: `...`
})
export class ClockComponent {
  @Input() time;
}
```

1. `@Output() time = new EventEmitter();`
1. `@Output() timeChange;`
1. `@Output() timeChange = new EventEmitter();`
1. `@Output() onChange = new EventEmitter();`

---

<!--
	Correct answer is 4.

  1 - This may expose a misunderstanding of outputs and two-way binding itself, since the short-hand syntax looks like a simpe combination of these two attributes
  2 - This answer may expose confusion with the naming relationship between `time` and `timeChange`
  3 - Input/Output syntax is not well understood
-->
`<clock [(time)]="currentTime"></clock>` is equivalent to the long-hand form of:

1. `<clock (time)="currentTime" [time]="currentTime"></clock>`
1. `<clock [time]="currentTime" (time)="currentTime=$event"></clock>`
1. `<clock (time)="currentTime" [timeChange]="currentTime=$event"></clock>`
1. `<clock [time]="currentTime" (timeChange)="currentTime=$event"></clock>`

---

<!--
	Correct answer is 2.

  1 - This may expose the assumption that values will be implcitily passed into the called back provided
  3 - This answer may expose confusion of how tw-way bindings actually work.
  4 - This may expose confusion or a lack of understanding what the the `$event` variable represents
-->
What is one way in which to interface with a two-way bound property that allows us to handle changes to a value, rather than synchronize values?

1. `<clock [time]="currentTime" (timeChange)="onTimeChange()"></clock>`
1. `<clock [time]="currentTime" (timeChange)="onTimeChange($event)"></clock>`
1. You can't, two-way bound properties must be used to keep data in sync.
1. `<clock [time]="currentTime" (timeChange)="onTimeChange(time)"></clock>`

---

