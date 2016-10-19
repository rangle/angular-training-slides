import { Component } from "@angular/core";
import { CarBodyComponent } from "./car-body.component";
import { CarEngineComponent } from "./car-engine.component";
import { CarTireComponent } from "./car-tire.component";

@Component({
  selector: "car",
  template: `<div>
              <h1>Car</h1>
              <b>Engine</b>
              <ul>                 
                <li>Horsepower = {{engine.horsepower}}</li>
                <li>Has a V8 = {{engine.isV8}}</li>
              </ul>
              <b>Tires</b>
              <ul>
                <li>Size = {{tires.size}}</li>
                <li>Does spin = {{tires.spinning}}</li>
              </ul>
              <b>Body</b>
              <ul>
                <li>Color = {{body.color}}</li>
              </ul>
            </div>`
})
export class CarComponent {
  constructor(
    private body: CarBodyComponent,
    private engine: CarEngineComponent,
    private tires: CarTireComponent) {
  }
}
