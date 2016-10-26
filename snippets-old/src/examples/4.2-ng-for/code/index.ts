import { Component } from '@angular/core';

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
    { id: 1, value: 'first the worst' },
    { id: 2, value: 'second the best' },
    { id: 3, value: 'third the nerd' },
    { id: 4, value: 'fourth is a lowly composite' },
  ];
}
