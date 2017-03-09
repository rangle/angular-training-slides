import { FormsModule } from '@angular/forms';

import { TestComponentSupport } from '../../test/test-component-support.class';
import { configureTestModule } from '../../test/configure-test-module.function';
import { ButtonGroupingComponent } from './button-grouping.component';

describe('ButtonGroupingComponent', () => {
  let support: TestComponentSupport<ButtonGroupingComponent>;

  beforeEach(configureTestModule({
    imports: [
      FormsModule,
    ],
    declarations: [
      ButtonGroupingComponent
    ],
  }));

  beforeEach(() => {
    support = new TestComponentSupport<ButtonGroupingComponent>(ButtonGroupingComponent);
    support.update();
  });

  describe('when pressing the decrement button', () => {
    beforeEach(() => {
      spyOn(support.component.onDecrement, 'emit');
      support.component.counterValue = 10;
    });

    it('should emit a decremented counter value', () => {
      support.querySelector('button.decrementButton').click();

      expect(support.component.onDecrement.emit).toHaveBeenCalledWith(9);
    });
  });

  describe('when pressing the increment button', () => {
    beforeEach(() => {
      spyOn(support.component.onIncrement, 'emit');
      support.component.counterValue = 10;
    });

    it('should emit an incremented counter value', () => {
      support.querySelector('button.incrementButton').click();

      expect(support.component.onIncrement.emit).toHaveBeenCalledWith(11);
    });
  });
});
