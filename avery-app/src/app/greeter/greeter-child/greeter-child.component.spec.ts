import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreeterChildComponent } from './greeter-child.component';

describe('GreeterChildComponent', () => {
  let component: GreeterChildComponent;
  let fixture: ComponentFixture<GreeterChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreeterChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreeterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
