import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoListItem } from '../../../models/todo-list-item';

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
    this.taskReceived.emit(new TodoListItem(taskInput.value));
    taskInput.value = '';
  }

}
