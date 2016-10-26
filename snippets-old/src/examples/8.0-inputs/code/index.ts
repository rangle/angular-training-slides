import {Component} from '@angular/core';
export {CustomComponent} from './custom-component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `<custom-component value="Hello World!"></custom-component>`,
})
export class AppComponent { }
