import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import { TodoService } from '../services/todo.service';
import { Store } from '@ngrx/store';

let id = 0;

@Component({
  selector: 'avy-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: Array<TodoListItem> = [];

  constructor(
    private todoAction: TodoService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.todoAction.getDefaultList();
    this.todoAction.todoList$
      .subscribe((listOfTodos) => {
        this.todoList = listOfTodos;
        console.log('todo list received', this.todoList);
      })
  }

  addTodos(todo: string) {
    this.todoAction.addTodos(todo);
    this.store.dispatch({
      type: 'ADD_TODOS',
      payload: {
        label: todo
      }
    });
  }

  handleCompletedTodo(id: number) {
    this.todoAction.completeTodo(id);
  }

  handleDeletedTodo(todoId: number) {
    this.todoAction.deleteTodo(todoId);
  }
}
