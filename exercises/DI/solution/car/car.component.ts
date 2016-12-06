import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "car",
  encapsulation: ViewEncapsulation.None,
  styles: [ require("../index.css") ],
  template: `
  <div>
    <h2 class="center">Car Components</h2>
    <div class="clearfix">
      <div class="col col-4 p2"><car-body></car-body></div>
      <div class="col col-4 p2"><car-engine></car-engine></div>
      <div class="col col-4 p2"><car-tire></car-tire></div>
    </div>
  </div>`
})
export class CarComponent {}
