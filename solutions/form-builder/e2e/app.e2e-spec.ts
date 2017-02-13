import { FormBuilderPage } from './app.po';

describe('form-builder App', function() {
  let page: FormBuilderPage;

  beforeEach(() => {
    page = new FormBuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
