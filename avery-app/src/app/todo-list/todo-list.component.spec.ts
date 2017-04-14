import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

// const todoActions: any = {
//   someMethod: () => {}
// }

// const mockStore: any = {
//   someMethod: () => {}
// }


describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      // providers: [
      //   { provide: RealService, useClass: MockService }
      // ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // component = new TodoListComponent(
    //   todoActions as TodoActions,
    //   mockStore as Store<any>
    // );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
