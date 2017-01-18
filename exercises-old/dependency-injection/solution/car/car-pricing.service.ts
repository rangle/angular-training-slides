import { Injectable } from "@angular/core";

@Injectable()
export class CarPricingService {
  getPrice(info) {
      switch (info.type) {
        case "Body":
          if (info.value === "red") {
            return 200;
          } else {
            return 100;
          }
        case "Engine":
          if (info.value) {
            return 500;
          } else {
            return 300;
          }
        case "Tire":
          return 4 * info.value;
      }
  }
}
