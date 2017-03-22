import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList = [];

  constructor() { }

  ngOnInit() {
  }

  onTaskReceived(task){
    this.todoList.push(task);
  }

  onTaskCompleted(taskIndex) {
    this.todoList[taskIndex].isComplete = true;
  }
  
  onTaskDeleted(taskIndex) {
    this.deleteTaskAt(taskIndex);
  }

  deleteTaskAt(index) {
    this.todoList.splice(index, 1);
  }

}
