import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<input
    type="button"
    value="{{ label }}"
    (click)="onClick()">
    <span *ngIf="label !='show'">{{ someString }}</span>`,
  styles: [``]
})
export class AppComponent {
  label = 'show';
  someString = 'What if you could conditionally show components?';
  onClick() {
      if (this.label === 'show') {
        this.label = 'hide';
      } else {
        this.label = 'show';
      }
  };
}
