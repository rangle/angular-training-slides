import { Component } from '@angular/core';

const defaultCounterValue = 10;

@Component({
  selector: 'app-counter-display',
  templateUrl: 'counter-display.component.html'
})
export class CounterDisplayComponent {
  counterValue: number;
  defaultCounterValue: number;

  ngOnInit() {
    this.setDefaultValue();
  }

  setDefaultValue() {
    this.counterValue = this.defaultCounterValue =
      Number.isInteger(this.defaultCounterValue) ?
      this.defaultCounterValue : defaultCounterValue;
  }
}
