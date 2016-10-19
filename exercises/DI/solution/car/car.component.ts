import { Component } from "@angular/core";

@Component({
  selector: "car",
  template: `
  <div>
    <h1>Car</h1>
    <car-body></car-body>
    <car-engine></car-engine>
    <car-tire></car-tire>
  </div>`
})
export class CarComponent {}
