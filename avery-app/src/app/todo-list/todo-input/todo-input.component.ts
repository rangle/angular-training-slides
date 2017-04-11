import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'avy-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  @Output() onTodoItem = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addTodo(todoInput: HTMLInputElement) {
    this.onTodoItem.emit(todoInput.value);
    todoInput.value = '';
  }

}
