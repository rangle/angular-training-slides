import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { CounterDisplayComponent } from './';
import { ButtonGroupingComponent } from '../button-grouping';
import { FormsModule } from '@angular/forms';

let fixture: ComponentFixture<CounterDisplayComponent>;

describe('CounterDisplayComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        CounterDisplayComponent,
        ButtonGroupingComponent
      ],
    });

    fixture = TestBed.createComponent(CounterDisplayComponent);
    fixture.detectChanges();
  });

  it('Add the app-button-grouping child component', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-button-grouping')).not.toBeNull('app-button-grouping doesn\'t exist');
  }));

  it('Use projection to project a span with the value "Decrement" into the decrement button', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const decrementButton = compiled.querySelector('app-button-grouping button.decrementButton span');

    expect(decrementButton).not.toBeNull('Decrement button span doesn\'t exist');
    expect(decrementButton.textContent).toBe('Decrement');
  }));

  it('Use projection to project a span with the value "Increment" into the increment button', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const incrementButton = compiled.querySelector('app-button-grouping button.incrementButton span');

    expect(incrementButton).not.toBeNull('Increment button span doesn\'t exist');
    expect(incrementButton.textContent).toBe('Increment');
  }));
});
