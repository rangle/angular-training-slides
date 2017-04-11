import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGreetInputComponent } from './dynamic-greet-input.component';

describe('DynamicGreetInputComponent', () => {
  let component: DynamicGreetInputComponent;
  let fixture: ComponentFixture<DynamicGreetInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicGreetInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGreetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
