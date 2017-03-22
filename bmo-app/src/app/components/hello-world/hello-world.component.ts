import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  name = 'Person';
  constructor() { }

  ngOnInit() {
  }

  changeName(nameInput) {
    this.name = nameInput;
  }

  changeNameDynamically(nameInput){
    this.name = nameInput.value;
    nameInput.value = "";
  }

}
