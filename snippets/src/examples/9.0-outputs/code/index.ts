import {Component} from '@angular/core';
export {ClickAbleComponent} from './clickable';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `<click-able (action)="onAction($event)"></click-able>
             <span>{{ output }}</span>`,
})
export class AppComponent {
  output: string = '';
  onAction(data) {
      this.output += data + ' ';
  }
}
