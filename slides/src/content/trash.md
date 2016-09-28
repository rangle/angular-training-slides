## The Root Component

_app/app.component.ts_

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <h1>Basic Angular 2 Application</h1>
    <p>Hello World</p>
  `,
  styles: [`
    p { 
      color: red;
    }
  `]
})
export class AppComponent {}
```

Notes:

- It's a good practice to prefix the selector name (`rio-`)
- We can define an external template with the `templateUrl` property
- We can define an external css file for the component with the `styleUrl` property
- Styles apply only to the component similar to shadow root
- We can define other encapsulation modes using the `encapsulation` property
