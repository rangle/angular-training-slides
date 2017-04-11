import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'avy-rolldown',
  templateUrl: './rolldown.component.html',
  styleUrls: ['./rolldown.component.css']
})
export class RolldownComponent implements OnInit {
  @Input() title = '';
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  rollup() {
    this.isOpen = false;
  }

}
