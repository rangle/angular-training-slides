import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button-grouping',
  templateUrl: 'button-grouping.component.html',
  styleUrls: ['button-grouping.component.css']
})
export class ButtonGroupingComponent {
  @Input() counterValue: number;
  @Output() onIncrement = new EventEmitter();
  @Output() onDecrement = new EventEmitter();

  increment(): void {
    // Implement this method
    this.onIncrement.emit(this.counterValue + 1);
  }

  decrement(): void {
    // Implement this method
    this.onDecrement.emit(this.counterValue - 1);
  }
}
