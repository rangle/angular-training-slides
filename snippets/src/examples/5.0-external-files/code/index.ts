import { Component } from '@angular/core';
export {
  HelloFromAnotherWorldComponent,
} from './hello-from-another-world.component';

@Component({
  selector: 'app-root',
  template: `<hello-from-another-world></hello-from-another-world>`,
  styles: [``]
})
export class AppComponent {}
