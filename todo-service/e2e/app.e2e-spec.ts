import { TodoServicePage } from './app.po';

describe('todo-service App', () => {
  let page: TodoServicePage;

  beforeEach(() => {
    page = new TodoServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
