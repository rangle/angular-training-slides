import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import {TodoService} from '../services/todo.service';

let id = 0;

@Component({
  selector: 'avy-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  private todoList: Array<TodoListItem> = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todoList$
      .subscribe((listOfTodos) => {
        this.todoList = listOfTodos;
        console.log('todo list received', this.todoList);
      })
  }

  addTodos(todo: string) {
    this.todoService.addTodos(todo);
  }

  handleCompletedTodo(id: number) {
    this.todoService.completeTodo(id);
  }

  handleDeletedTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }
}
