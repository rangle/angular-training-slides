import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TodoListService } from './todolist.service';

describe('TodoListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        TodoListService,
        {
          provide: Http,
          useValue: {
            get: () => Observable.of({ json: () => [] }),
          },
        },
      ],
    });
  });

  it('should add a todo', inject([TodoListService], (service: TodoListService) => {
    service.addTodo('label');
    expect(service.state.length).toBe(1);
  }));

  it('should delete a todo', inject([TodoListService], (service: TodoListService) => {
    service.addTodo('label');
    service.deleteTodo(0);
    expect(service.state.length).toBe(0);
  }));

  it('should toggle a todo', inject([TodoListService], (service: TodoListService) => {
    service.addTodo('label');
    service.toggleTodo(0);
    expect(service.state[0].done).toBe(true);
  }));

});
