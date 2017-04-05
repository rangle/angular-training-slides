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
    this.defaultCounterValue = Number.isInteger(this.defaultCounterValue) ?
      this.defaultCounterValue : defaultCounterValue;
    this.counterValue = this.defaultCounterValue;
  }
}
