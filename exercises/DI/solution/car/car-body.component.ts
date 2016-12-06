import { Component } from "@angular/core";
import { CarPricingService } from "./car-pricing.service";

@Component({
  selector: "rio-car-body",
  template: `
  <div class="border p2 bg-blue rounded white">
    <b>Body</b>
    <ul>
      <li>Color = {{color}} </li>
      <li>Size = {{size}} </li>
    </ul>
    <p *ngIf="quoted">Price: {{price}}</p>
    <button class="btn btn-small btn-primary mb1 bg-navy" (click)="getQuote()">Quote</button>
  </div>`
})
export class CarBodyComponent {
  color: String = "red";
  size: String = "Normal";
  constructor(public carPricingService: CarPricingService) {}
  price: Number = 0;
  quoted: Boolean = false;
  getQuote() {
    this.price = this.carPricingService.getPrice({ type: "Body", value: this.color});
    this.quoted = true;
  }
}
