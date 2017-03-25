import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../../models/todo-list-item';
import { TodoListService } from '../../services/todo-list.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: Array<TodoListItem> = [];

  constructor(private todoListService: TodoListService,
              private storeService : Store<any>,
              private router: Router
  ) { 
  }

  ngOnInit() {
    this.todoListService.getDefaultList();
  }

  onTaskReceived(task: TodoListItem){
    this.storeService.dispatch({
      type: 'ADD_TODO_LIST_TASK',
      payload: task
    });
  }

  onTaskCompleted(taskIndex) {
    this.storeService.dispatch({
      type: 'COMPLETE_TODO_LIST_TASK',
      payload: {
        taskIndex : taskIndex
      }
    });
  }
  
  onTaskDeleted(taskIndex) {
    this.storeService.dispatch({
      type: 'DELETE_TODO_LIST_TASK',
      payload: {
        taskIndex : taskIndex
      }
    });
  }


}
