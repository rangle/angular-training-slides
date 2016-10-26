import { AngularTrainingExamplesPage } from './app.po';

describe('angular-training-examples App', function() {
  let page: AngularTrainingExamplesPage;

  beforeEach(() => {
    page = new AngularTrainingExamplesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
