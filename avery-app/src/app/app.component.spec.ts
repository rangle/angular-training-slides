import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({
  selector: 'avy-todo-list',
  template: `Mock Todo List`
})
class MockTodoListComponent {
}


fdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockTodoListComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it(`should set title when setTitle is called`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.setTitle('new value');

    expect(app.title).toEqual('new value');
  }));

  it(`should display current title in an h1`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appInstance = fixture.debugElement.componentInstance;
    const appElement = fixture.debugElement.nativeElement;

    appInstance.setTitle('new value');
    fixture.detectChanges();

    expect(appElement.querySelector('h1').textContent).toEqual('new value');
  }));

});
