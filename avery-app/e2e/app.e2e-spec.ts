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

  it('should have 5 todo items displayed', () => {
  });

  it('avery.com/rolls should open request sample modal', () => {
    page.navigateTo('http://www.avery.com/rolls');
    expect(page.getAveryRollsHeader()).toEqual('Avery WePrint™ Roll Labels');

    expect(page.getModalCloseButton().isPresent()).toBeFalsy();

    page.requestSample()
      .then(() => {
        expect(page.getModalCloseButton().isDisplayed()).toBeTruthy();
      });
  });
});
