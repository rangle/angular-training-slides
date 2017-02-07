import { RoutingExercisePage } from './app.po';

describe('routing-exercise App', function() {
  let page: RoutingExercisePage;

  beforeEach(() => {
    page = new RoutingExercisePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
