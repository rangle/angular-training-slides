import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolldownComponent } from './rolldown.component';

describe('RolldownComponent', () => {
  let component: RolldownComponent;
  let fixture: ComponentFixture<RolldownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolldownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
