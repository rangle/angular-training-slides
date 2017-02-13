import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-list',
  template: `
      <ul>
        <li 
          *ngFor="let todo of todoItems; let i = index;"
          [class.complete]="todo.complete">
           <input class="toggle" type="checkbox" (click)="onToggle.emit(i)" [checked]="todo.complete">
           <label>{{todo.title}}</label>
           <button (click)="onDelete.emit(i)">Delete</button>
        </li>
      </ul>
    `,
  styles: ['.complete { text-decoration: line-through; }'],
})
export class TodoListComponent {
  @Input() todoItems;
  @Output() onDelete = new EventEmitter();
  @Output() onToggle = new EventEmitter();
}