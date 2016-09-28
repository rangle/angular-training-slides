# Directives

---

## An Introduction to Directives

- A directive is a pluggable element that can extend a component functionality (user interaction)
- A component can be thought of as a directive with a template

Directives classification:

- **Structural directives:** Modifies the template of a component or native element 
- **Attribute directives:** Modifies the behavior of a component or native element

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


