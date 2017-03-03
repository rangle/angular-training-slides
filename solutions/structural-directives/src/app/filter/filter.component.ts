import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Laptop } from '../shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() laptops: Laptop[];
  @Output() filter = new EventEmitter<Laptop[]>();

  showInStock(): void {
    const laptops = this.laptops.filter(laptop => laptop.inStock);
    this.filter.emit(laptops);
  }

  showOutOfStock(): void {
    const laptops = this.laptops.filter(laptop => !laptop.inStock);
    this.filter.emit(laptops);
  }

  showAll(): void {
    const laptops = [...this.laptops];
    this.filter.emit(laptops);
  }

  sortAscending(): void {
    const laptops = [...this.laptops].sort((a, b) => a.price - b.price);
    this.filter.emit(laptops);
  }

  sortDescending(): void {
    const laptops = [...this.laptops].sort((a, b) => b.price - a.price);
    this.filter.emit(laptops);
  }
}
