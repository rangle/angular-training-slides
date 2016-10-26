import {Component, Input} from '@angular/core';

@Component({
  selector: 'custom-component',
  template: `{{ value }}`,
})
export class CustomComponent {
  @Input() value;
}
