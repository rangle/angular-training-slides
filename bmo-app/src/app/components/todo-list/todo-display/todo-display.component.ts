import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-display',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.css']
})
export class TodoDisplayComponent implements OnInit {
  @Input() todoList = [];

  @Output() taskCompleted = new EventEmitter();
  @Output() taskDeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  completeTask(todoIndex) {
    this.taskCompleted.emit(todoIndex);
  }

  isComplete(todo) {
    return todo.isComplete ? 'completed' : '';
  }

  deleteTask(todoIndex) {
    this.taskDeleted.emit(todoIndex);
  }

}
