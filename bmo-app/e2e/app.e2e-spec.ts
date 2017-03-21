import { BmoAppPage } from './app.po';

describe('bmo-app App', function() {
  let page: BmoAppPage;

  beforeEach(() => {
    page = new BmoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
