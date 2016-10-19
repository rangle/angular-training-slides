import { Component } from "@angular/core";
import { CarPricingService } from "./car-pricing.service";

@Component({
  selector: "car-engine",
  template: `
  <b>Engine</b> <button (click)="getQuote()">Quote</button>
  <ul>
    <li>Horsepower = {{ horsePower }}</li>
    <li>Has a V8 = {{ isV8 }}</li>
  </ul>
  <p *ngIf="quoted">Price: {{price}}</p>`
})
export class CarEngineComponent {
  isV8: Boolean = true;
  horsePower: Number = 2300;
  constructor(public carPricingService: CarPricingService) {}
  price: Number = 0;
  quoted: Boolean = false;
  getQuote() {
    this.price = this.carPricingService.getPrice({ type: "Engine", value: this.isV8});
    this.quoted = true;
  }
}
