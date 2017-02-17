/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LastNameComponent } from './last-name.component';

describe('LastNameComponent', () => {
  let component: LastNameComponent;
  let fixture: ComponentFixture<LastNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
