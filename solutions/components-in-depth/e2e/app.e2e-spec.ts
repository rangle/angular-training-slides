import { ComponentsInDepthPage } from './app.po';

describe('components-in-depth App', function() {
  let page: ComponentsInDepthPage;

  beforeEach(() => {
    page = new ComponentsInDepthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
