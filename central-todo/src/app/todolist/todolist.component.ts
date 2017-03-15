import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TodoListService } from './todolist.service';
import { ITodo } from './todolist.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  newTodo: string;
  todos: Observable<Array<ITodo>>;

  constructor(private todoService: TodoListService) {
    this.newTodo = '';
    console.log('initialized');
  }

  ngOnInit(){
    this.todos = this.todoService.subscribeToTodos();
  }

  changeValue(event) {
    this.newTodo = event.target.value;
  }

  addTodo() {
    if (this.newTodo.length > 0) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodo(index);
  }

  completeTodo(index: number) {
    this.todoService.toggleTodo(index);
  }

}
