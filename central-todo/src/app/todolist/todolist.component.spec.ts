import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TodolistComponent } from './todolist.component';
import { TodoListService } from './todolist.service';
import { ITodo, Todo } from './todolist.model';

describe('TodolistComponent', () => {
  let testServiceSpy;
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(async(() => {
    testServiceSpy = jasmine.createSpyObj('mockTodoServiceObject', [
      'subscribeToTodos',
      'addTodo',
      'deleteTodo',
      'toggleTodo',
    ]);
    TestBed.configureTestingModule({
      declarations: [ TodolistComponent ],
      imports: [
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: TodoListService, useValue: testServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTodo', () => {
    component.newTodo = 'something';
    component.addTodo();
    expect(testServiceSpy.addTodo).toHaveBeenCalledWith('something');
    expect(component.newTodo).toBe('');
  });

  it('should call deleteTodo', () => {
    component.deleteTodo(3);
    expect(testServiceSpy.deleteTodo).toHaveBeenCalledWith(3);
  });

  it('should call toggleTodo', () => {
    component.toggleTodo(2);
    expect(testServiceSpy.toggleTodo).toHaveBeenCalledWith(2);
  });
});
