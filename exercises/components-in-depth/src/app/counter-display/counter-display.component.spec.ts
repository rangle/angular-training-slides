import { FormsModule } from '@angular/forms';

import { TestComponentSupport } from '../../test/test-component-support.class';
import { configureTestModule } from '../../test/configure-test-module.function';
import { ButtonGroupingComponent } from '../button-grouping';
import { CounterDisplayComponent } from './counter-display.component';

describe('CounterDisplayComponent', () => {
  let support: TestComponentSupport<CounterDisplayComponent>;

  beforeEach(configureTestModule({
    imports: [
      FormsModule,
    ],
    declarations: [
      CounterDisplayComponent,
      ButtonGroupingComponent
    ],
  }));

  beforeEach(() => {
    support = new TestComponentSupport<CounterDisplayComponent>(CounterDisplayComponent);
    support.update();
  });

  it('should contain the app-button-grouping child component', () => {
    expect(support.querySelector('app-button-grouping')).not.toBeNull(
      'app-button-grouping doesn\'t exist'
    );
  });

  it('should project the "Decrement" text into the decrement button', () => {
    const decrementButton = support.querySelector('app-button-grouping button.decrementButton span');

    expect(decrementButton).not.toBeNull('Decrement button span doesn\'t exist');
    expect(decrementButton.textContent).toBe('Decrement');
  });

  it('should project the "Increment" text into the increment button', () => {
    const incrementButton = support.querySelector('app-button-grouping button.incrementButton span');

    expect(incrementButton).not.toBeNull('Increment button span doesn\'t exist');
    expect(incrementButton.textContent).toBe('Increment');
  });
});
