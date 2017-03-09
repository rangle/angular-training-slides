import { NcourseExercisesPage } from './app.po';

describe('ncourse-exercises App', () => {
  let page: NcourseExercisesPage;

  beforeEach(() => {
    page = new NcourseExercisesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
