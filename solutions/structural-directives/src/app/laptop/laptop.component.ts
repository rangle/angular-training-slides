import { Component, Input } from '@angular/core';

import { Laptop } from '../shared';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent {
  @Input() laptop: Laptop;
}
