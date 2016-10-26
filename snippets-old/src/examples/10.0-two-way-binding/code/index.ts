import {Component} from '@angular/core';
export {ChildComponent} from './child';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `
    <child-io [(value)]="parentValue"></child-io>
    <div>Parent Value: {{ parentValue }}</div>
`,
})
export class AppComponent {
  parentValue: string = 'two way binding';
}
