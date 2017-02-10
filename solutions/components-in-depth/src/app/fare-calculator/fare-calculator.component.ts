import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-fare-calculator',
  templateUrl: './fare-calculator.component.html'
})
export class FareCalculatorComponent {
  @Input() rate: number;
  @Input() interval: number;
  time: number;

  getCurrentFare(rate = 0, time = 0): string {
    return (rate * time).toFixed(2);
  }
}
