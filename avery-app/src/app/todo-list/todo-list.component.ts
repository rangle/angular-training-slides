import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';

let id = 0;

@Component({
  selector: 'avy-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: Array<TodoListItem> = [
    this.getTodoItem('Buy Milk'),
    this.getTodoItem('Get Gas'),
  ];

  constructor() { }

  ngOnInit() {
  }

  addTodos(todo: string) {
    this.todoList = this.todoList
      .concat(this.getTodoItem(todo));
  }

  getTodoItem(todoText: string): TodoListItem {
    return new TodoListItem(id++, todoText);
  }

  handleCompletedTodo(id: number) {
    this.todoList.map((todoItem) => {
      if (todoItem.id === id){
        todoItem.isCompleted = true;
      }
      return todoItem;
    });
  }

  handleDeletedTodo(todoId: number) {
    this.todoList = this.todoList
      .filter(todo => todoId !== todo.id);
  }
}
