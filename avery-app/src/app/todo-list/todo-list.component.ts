import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../models/todo-list-item';
import { TodoActions } from '../actions/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';

let id = 0;

@Component({
  selector: 'avy-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: Array<TodoListItem> = [];

  constructor(
    private todoAction: TodoActions,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.todoAction.getDefaultList();

    this.store.select('todos', 'list')
      .subscribe((listOfTodos: Array<TodoListItem>) => {
        this.todoList = listOfTodos;
        console.log('todo list received', this.todoList);
      });
  }

  addTodos(todo: string) {
    this.todoAction.addTodos(todo);
  }

  handleCompletedTodo(id: number) {
    this.todoAction.completeTodo(id);
  }

  handleDeletedTodo(todoId: number) {
    this.todoAction.deleteTodo(todoId);
  }
}
