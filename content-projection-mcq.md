<!--
	Correct answer is 3.

	1 - May expose a misunderstanding that `<ng-content>` is a special directive that acts as a placeholder for the location content should be projected.
  2- May expose a misunderstanding the `<ng-content>` does not wipe out a template's entire contents.
-->
Which text will the following component template render out to the screen when used in this way?

Component declaration:
```typescript
@Component({
  selector: 'label-prefix',
  template: `Label: <ng-content></ng-content>`
})
```

Usage:
```html
<label-prefix>My custom label</label-prefix>
```

1. Label:
1. My custom label
1. Label: My custom label

---

<!--
	Correct answer is 3.

	1, 2 - It may seem ng-content `select` should only match a single element as there is only one `<ng-content>` tag. This is not the case. Both spans will be rendered.

  4 - `select` will greedily match as many elements as it can
-->
Which text will the following component template render out to the screen when used in this way?

Component declaration:
```typescript
@Component({
  selector: 'fox',
  template: 'The quick brown fox <ng-content select="span"></ng-content>'
})
```

Usage:
```html
<fox>
  <span> greatly leaps and</span>
  <span> bounds over the lazy dog</span>
</fox>
```

1. The quick brown fox bounds over the lazy dog
1. The quick brown fox greatly leaps and
1. The quick brown fox greatly leaps and bounds over the lazy dog
1. None. An error will be thrown because `select` does not support multiple matching elements

---

<!--
	Correct answer is 2.

	1, 3, 4 - When used in conjunction with `select`, a standard `<ng-content>` will act as a catch-all and will projection any content not captured by other selectors. It does not blindly select everything
-->
Which text will the following component template render out to the screen when used in this way?

Component declaration:
```typescript
@Component({
  selector: 'fox',
  template: `
    <ng-content></ng-content>
    The quick brown fox
    <ng-content select="span"></ng-content>
  `
})
```

Usage:
```html
<fox>
  <span> greatly leaps and</span>
  <span> bounds over the lazy dog</span>
  We can only know one thing for sure.
</fox>
```

1. greatly leaps and bounds over the lazy dog We can only know one thing for sure. The quick brown fox greatly leaps and bounds over the lazy dog
1. We can only know one thing for sure. The quick brown fox greatly leaps and bounds over the lazy dog
1. The quick brown fox greatly leaps and bounds over the lazy dog
1. None. An error will be thrown because `select` does not work along side a bare `<ng-content>` tag

---

<!--
	Correct answer is 1.

	2, 3 - `select` operates on a subset of CSS selectors `[header]` denotes an attribute named `header` rather than an element selector of `header`,
-->
Which text will the following component template render out to the screen when used in this way?

Component declaration:
```typescript
@Component({
  selector: 'card',
  template: `
    <ng-content select="[header]"></ng-content>
    <p>Body text</p>
  `
})
```

Usage:
```html
<card>
  <header>Main Header</header>
  <div header>Other Header</div>
</card>
```

1. Other Header<br>
   Body text
1. Main Header<br>
   Body text
1. Main Header<br>
   Other Header<br>
   Body text

---

<!--
	Correct answer is 3.

	1, 2 - When multiple bare `<ng-content>`'s are present, Angular will render projected content into that last `<ng-content>` block ignoring the others.
-->
Which text will the following component template render out to the screen when used in this way?

Component declaration:
```typescript
@Component({
  selector: 'card',
  template: `
    <ng-content></ng-content>
    <p>Body text</p>
    <ng-content></ng-content>
  `
})
```

Usage:
```html
<card>
  <header>Main Header</header>
  <div>Other Header</div>
</card>
```

1. Main Header<br>
   Other Header<br>
   Body text
1. Main Header<br>
   Other Header<br>
   Body text
   Main Header<br>
   Other Header<br>
1. Body text
   Main Header<br>
   Other Header<br>
1. None. An error will be thrown because multiple bare `<ng-content>` tags are not supported

---

<!--
	Correct answer is 3.

	1, 2 - `select` will only do a shallow selector match. Children of other elements do not get selected
-->
Which text will the following component template render out to the screen when used in this way?

Component declaration:
```typescript
@Component({
  selector: 'tab-list',
  template: `<ng-content select="tab"></ng-content>`
})
```

Usage:
```html
<tab-list>
  <nav>
    <tab>Tab1</tab>
    <tab>Tab2</tab>
    <tab>Tab3</tab>
  </nav>
  <tab>New</tab>
</tab-list>
```

1. Tab1 Tab2 Tab3 New
1. New Tab1 Tab2 Tab3
1. New
