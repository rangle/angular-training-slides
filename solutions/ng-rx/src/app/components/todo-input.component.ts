import { Component, EventEmitter, Output, style } from '@angular/core';

@Component({
  selector: 'todo-input',
  template: `
      <input #title type="text" />
      <button 
        (click)="onInsert.emit(title)">
        Add Task
      </button>
    `
})
export class TodoInputComponent {
  @Output() onInsert = new EventEmitter();
}