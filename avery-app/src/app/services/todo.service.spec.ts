import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TodoListItem } from '../models/todo-list-item';

import { TodoService } from './todo.service';

const initialTodoListData = [
  new TodoListItem(0, 'Buy Milk', false),
  new TodoListItem(1, 'Get Gas', false)
];

const addedTodoData = [
  new TodoListItem(0, 'Buy Milk', false),
  new TodoListItem(1, 'Get Gas', false),
  new TodoListItem(2, 'New Todo', false)
];

fdescribe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: Http, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));

  it('should have two todos set (Buy Milk, and Get Gass)', inject([TodoService], (service: TodoService) => {
    expect(service.todoList).toEqual(initialTodoListData);
  }));

  it('should add a todo to todoList and emit the latest', inject([TodoService], (service: TodoService) => {
    const emitTodosSpy = spyOn(service, 'emitTodos');
    service.addTodos('New Todo');

    expect(service.todoList).toEqual(addedTodoData);
    expect(emitTodosSpy).toHaveBeenCalledTimes(1);
  }));
});
