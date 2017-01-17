import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "rio-car",
  template: `
  <div>
    <h2 class="center">Car Components</h2>
    <div class="clearfix">
      <div class="col col-4 p2"><rio-car-body></rio-car-body></div>
      <div class="col col-4 p2"><rio-car-engine></rio-car-engine></div>
      <div class="col col-4 p2"><rio-car-tire></rio-car-tire></div>
    </div>
  </div>`
})
export class CarComponent {}
