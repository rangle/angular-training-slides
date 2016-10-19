import { Component } from "@angular/core";

@Component({
  selector: "car-engine",
  template: `
  <b>Engine</b>
  <ul>
    <li>Horsepower = {{horsepower}}</li>
    <li>Has a V8 = {{isV8}}</li>
  </ul>`
})
export class CarEngineComponent {
  isV8: Boolean = true;
  horsePower: Number = 2300;
}
