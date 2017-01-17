import { Component } from "@angular/core";
import { CarPricingService } from "./car-pricing.service";

@Component({
  selector: "rio-car-engine",
  template: `
  <div class="border p2 bg-blue rounded white">
    <b>Engine</b>
    <ul>
      <li>Horsepower = {{ horsePower }}</li>
      <li>Has a V8 = {{ isV8 }}</li>
    </ul>
    <p *ngIf="quoted">Price: {{price}}</p>
    <button class="btn btn-small btn-primary mb1 bg-navy" (click)="getQuote()">Quote</button>
  </div>`
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
