import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'avy-todo-display',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.css']
})
export class TodoDisplayComponent implements OnInit {
  @Input() todoList: Array<any> = [];
  @Output() onCompleted = new EventEmitter();
  @Output() onDeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  completeTodo(todoItemId: number) {
    this.onCompleted.emit(todoItemId);
  }

  deleteTodo(todoItemId: number) {
    this.onDeleted.emit(todoItemId);
  }

}
