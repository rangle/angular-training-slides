import { WebinarAppPage } from './app.po';

describe('webinar-app App', () => {
  let page: WebinarAppPage;

  beforeEach(() => {
    page = new WebinarAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
