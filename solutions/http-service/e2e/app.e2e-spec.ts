import { HttpServicePage } from './app.po';

describe('http-service App', function() {
  let page: HttpServicePage;

  beforeEach(() => {
    page = new HttpServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
