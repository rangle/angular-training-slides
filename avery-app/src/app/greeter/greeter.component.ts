import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent implements OnInit {
  currentName = 'world';

  names = [
    'john',
    'philip',
    'sally',
    'mike'
  ];

  constructor() { }

  ngOnInit() {
  }

  setName(name: string) {
    this.currentName = name;
  }

  addName(name: string) {
    this.names = this.names.concat(name);
  }

}
