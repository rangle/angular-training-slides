import { Component, OnInit } from '@angular/core';
import { ITodo, Todo } from './todolist.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  newTodo: string;
  todos: Array<ITodo>;

  constructor() {
    this.todos = [new Todo('default 1')];
    this.newTodo = '';
  }

  changeValue(event) {
    this.newTodo = event.target.value;
  }

  addTodo() {
    if (this.newTodo.length > 0) {
      this.todos.push(new Todo(this.newTodo));
      this.newTodo = '';
    }
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }

  completeTodo(index) {
    this.todos[index].done = !this.todos[index].done;
  }

}
