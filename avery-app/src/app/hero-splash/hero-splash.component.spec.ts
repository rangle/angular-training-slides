import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSplashComponent } from './hero-splash.component';

describe('HeroSplashComponent', () => {
  let component: HeroSplashComponent;
  let fixture: ComponentFixture<HeroSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
