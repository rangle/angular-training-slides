import { Component } from "@angular/core";
import { CarPricingService } from "./car-pricing.service";

@Component({
  selector: "car-body",
  template: `
    <b>Body</b> <button (click)="getQuote()">Quote</button>
    <ul>
      <li>Color = {{color}} </li>
    </ul>
    <p *ngIf="quoted">Price: {{price}}</p>`
})
export class CarBodyComponent {
  color: String = "red";
  constructor(public carPricingService: CarPricingService) {}
  price: Number = 0;
  quoted: Boolean = false;
  getQuote() {
    this.price = this.carPricingService.getPrice({ type: "Body", value: this.color});
    this.quoted = true;
  }
}
