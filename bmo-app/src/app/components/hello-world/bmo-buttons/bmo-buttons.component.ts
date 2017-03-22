import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bmo-buttons',
  templateUrl: './bmo-buttons.component.html',
  styleUrls: ['./bmo-buttons.component.css']
})
export class BmoButtonsComponent implements OnInit {
  
  @Output()
  nameChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
