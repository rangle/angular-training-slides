import { Component } from "@angular/core";

@Component({
  selector: "car-body",
  template: `
    <b>Body</b>
    <ul>
      <li>Color = {{body.color}}</li>
    </ul>`
})
export class CarBodyComponent {
  color: String = "red";
}
