import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'child-io',
  template: `
    <input 
      type="text" 
      [value]="value" 
      (keyup)="valueChange.emit($event.target.value)"> 
  `,
})
export class ChildComponent {
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
