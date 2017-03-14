import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableTestComponent } from './observable-test.component';

describe('ObservableTestComponent', () => {
  let component: ObservableTestComponent;
  let fixture: ComponentFixture<ObservableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
