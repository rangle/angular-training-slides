import { FormsModule } from '@angular/forms';

import { configureTestModule } from '../test/configure-test-module.function';
import { TestComponentSupport } from '../test/test-component-support.class';
import { AppComponent } from './app.component';
import { CounterDisplayComponent } from './counter-display/counter-display.component';
import { ButtonGroupingComponent } from './button-grouping/button-grouping.component';

describe('AppComponent', () => {
  let support: TestComponentSupport<AppComponent>;

  beforeEach(configureTestModule({
    imports: [
      FormsModule,
    ],
    declarations: [
      AppComponent,
      CounterDisplayComponent,
      ButtonGroupingComponent
    ],
  }));

  beforeEach(() => {
    support = new TestComponentSupport<AppComponent>(AppComponent);
    support.update();
  });

  it('should contain the app-counter-display child component', () => {
    expect(support.querySelector('app-counter-display')).toBeTruthy();
  });

});
