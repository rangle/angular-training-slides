import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TodoListItem } from '../models/todo-list-item';

import { TodoActions } from './todo.actions';

const initialTodoListData = [
  new TodoListItem(0, 'Buy Milk', false),
  new TodoListItem(1, 'Get Gas', false)
];

const addedTodoData = [
  new TodoListItem(0, 'Buy Milk', false),
  new TodoListItem(1, 'Get Gas', false),
  new TodoListItem(2, 'New Todo', false)
];

fdescribe('TodoActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoActions,
        { provide: Http, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([TodoActions], (service: TodoActions) => {
    expect(service).toBeTruthy();
  }));

  xit('should have two todos set (Buy Milk, and Get Gas)', inject([TodoActions], (service: TodoActions) => {
    expect(service.todoList).toEqual(initialTodoListData);
  }));

  xit('should add a todo to todoList and emit the latest', inject([TodoActions], (service: TodoActions) => {
    const emitTodosSpy = spyOn(service, 'emitTodos');
    service.addTodos('New Todo');

    expect(service.todoList).toEqual(addedTodoData);
    expect(emitTodosSpy).toHaveBeenCalledTimes(1);
  }));
});
