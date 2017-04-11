import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'avy-dynamic-greet-input',
  templateUrl: './dynamic-greet-input.component.html',
  styleUrls: ['./dynamic-greet-input.component.css']
})
export class DynamicGreetInputComponent implements OnInit {
  @Output() nameEntered = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendGreet(greeting) {
    this.nameEntered.emit(greeting);
  }

}
