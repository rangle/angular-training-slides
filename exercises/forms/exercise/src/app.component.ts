import {Component, ViewEncapsulation} from '@angular/core';
import Pizza from './pizza';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'rio-root',
  styles: [require('./index.css')],
  template: `<div class="p3">
    <h2 class="border-bottom caps">Pizza Editor</h2>
    <rio-pizza-editor [(pizza)]="pizza">
    </rio-pizza-editor>

  <pre class="p1 bg-darken-1 rounded">{{ pizza | json }}</pre>
  </div>`
})
export class App {
  pizza: Pizza = new Pizza(
    'Fior di Latte',
    'Tomato',
    'Basil',
    'Margherita'
  );
}
