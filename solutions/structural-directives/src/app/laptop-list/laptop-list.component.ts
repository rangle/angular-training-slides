import { Component } from '@angular/core';

import { Laptop } from '../shared';

const data = require('../shared/data.json');

@Component({
  selector: 'app-laptop-list',
  templateUrl: './laptop-list.component.html',
  styleUrls: ['./laptop-list.component.css']
})
export class LaptopListComponent {
  laptops: Laptop[] = data.laptops;
  filteredLaptops: Laptop[] = data.laptops;

  updateFilteredLaptops(filteredLaptops: Laptop[]): void {
    this.filteredLaptops = filteredLaptops;
  }
}
