import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'click-able',
  template: `<input 
               type="button" 
               value="click" 
               (click)="action.emit(text)">
             <input type="text" [value]="text" (change)="changeText($event)">
`,
})
export class ClickAbleComponent {
  @Output() action = new EventEmitter<string>();
  text: string = '';
  changeText(event) {
    this.text = event.target.value;
  }
}
