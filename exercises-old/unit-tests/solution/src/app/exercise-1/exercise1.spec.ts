import {AppComponent} from './index';

describe('App Component', () => {
  let app: AppComponent;

  beforeEach(() => {
    app = new AppComponent();
  });

  it('should be visible by default', () => {
    expect(app.visible).toBe(true);
  });

  it('should toggle to false', () => {
    app.toggleVisibility();
    expect(app.visible).toBe(false);
  });
});
