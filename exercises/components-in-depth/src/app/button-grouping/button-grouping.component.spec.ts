import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { ButtonGroupingComponent } from './';
import { FormsModule } from '@angular/forms';

let fixture: ComponentFixture<ButtonGroupingComponent>;

describe('ButtonGroupingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        ButtonGroupingComponent
      ],
    });

    fixture = TestBed.createComponent(ButtonGroupingComponent);
    fixture.detectChanges();
  });

  it('should emit the value decremented by one when the button is clicked', async(() => {
    const component = fixture.componentInstance;
    spyOn(component.onDecrement, 'emit');
    component.counterValue = 10;

    const nativeElement = fixture.debugElement.nativeElement;
    nativeElement.querySelector('button').click();

    fixture.whenStable().then(() => {
      expect(component.onDecrement.emit).toHaveBeenCalledWith(9);
    });

    // Also want to check that the `counterValue` in the parent is updated
    // properly by handling the event
  }));

  it('should emit the value incremented by one when the button is clicked', async(() => {
    const component = fixture.componentInstance;
    spyOn(component.onIncrement, 'emit');
    component.counterValue = 10;

    const nativeElement = fixture.debugElement.nativeElement;
    nativeElement.querySelectorAll('button')[1].click();

    fixture.whenStable().then(() => {
      expect(component.onIncrement.emit).toHaveBeenCalledWith(11);
    });

    // Also want to check that the `counterValue` in the parent is updated
    // properly by handling the event
  }));
});
