import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bmo-button',
  templateUrl: './bmo-button.component.html',
  styleUrls: ['./bmo-button.component.css']
})
export class BmoButtonComponent implements OnInit {
  @Input()
  name = '';

  @Output()
  nameChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
