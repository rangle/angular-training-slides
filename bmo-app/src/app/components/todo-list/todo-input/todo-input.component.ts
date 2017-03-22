import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() taskReceived = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addTask(taskInput){
    let task = {
      name : taskInput.value,
      isComplete : false
    };
    this.taskReceived.emit(task);
    taskInput.value = '';
  }

}
