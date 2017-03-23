import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListService } from '../../../services/todo-list.service';
import { TodoListItem } from '../../../models/todo-list-item';

@Component({
  selector: 'todo-display',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.css']
})
export class TodoDisplayComponent implements OnInit {
  @Output() taskCompleted = new EventEmitter();
  @Output() taskDeleted = new EventEmitter();
  todoList = [];

  constructor(
    private todoListService: TodoListService,
    private store: Store<any>) {
    this.store.select('todoList')
      .subscribe((result : Array<TodoListItem>) => {
        this.todoList = result;
      })
  }

  ngOnInit() {
  }

  getTodoList() {
    return this.todoListService.getTodoList();
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

  shouldDisplayError() {
    let todoList = this.getTodoList();
    return todoList.length === 0;
  }
}
