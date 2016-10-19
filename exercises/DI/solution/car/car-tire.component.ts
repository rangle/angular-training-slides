import { Component } from "@angular/core";

@Component({
  selector: "car-tire",
  template: `
  <b>Tires</b>
  <ul>
    <li>Size = {{size}}</li>
    <li>Does spin = {{spinning}}</li>
  </ul>`
})
export class CarTireComponent {
  size: Number = 200;
  spinning: Boolean = false;
}
