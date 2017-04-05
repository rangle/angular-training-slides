import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';

fdescribe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });
  });

  it('should initialize with 3 items', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
    expect(service.tasks.length).toBe(3);
  }));

  it('should give us a observable initialized to 3 item', inject([TodoService], (service: TodoService) => {
    let taskObservable = service.getTasksObservable();
    taskObservable
    .subscribe((tasks) => {
      expect(tasks.length).toBe(3);
    });
  }))
});
