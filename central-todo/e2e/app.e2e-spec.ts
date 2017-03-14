import { CentralTodoPage } from './app.po';

describe('central-todo App', () => {
  let page: CentralTodoPage;

  beforeEach(() => {
    page = new CentralTodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
