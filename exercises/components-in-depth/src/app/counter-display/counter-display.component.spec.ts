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
});
