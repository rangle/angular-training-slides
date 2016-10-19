import { Component } from "@angular/core";
import { CarPricingService } from "./car-pricing.service";

@Component({
  selector: "car-tire",
  template: `
  <b>Tires</b> <button (click)="getQuote()">Quote</button>
  <ul>
    <li>Size = {{size}}</li>
    <li>Does spin = {{spinning}}</li>
  </ul>
  <p *ngIf="quoted">Price: {{price}}</p>`
})
export class CarTireComponent {
  size: Number = 200;
  spinning: Boolean = false;
  constructor(public carPricingService: CarPricingService) {}
  price: Number = 0;
  quoted: Boolean = false;
  getQuote() {
    this.price = this.carPricingService.getPrice({ type: "Tire", value: this.size});
    this.quoted = true;
  }
}
