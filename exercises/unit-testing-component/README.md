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
1. When the component is rendered, the text `Insert a dummy message here` is shown in the template inside a paragraph