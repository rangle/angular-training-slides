import { AveryAppPage } from './app.po';

describe('avery-app App', () => {
  let page: AveryAppPage;

  beforeEach(() => {
    page = new AveryAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
