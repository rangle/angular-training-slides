import {ExerciseOneComponent} from './index';

describe('Exercise One Component', () => {
  let exOne: ExerciseOneComponent;

  beforeEach(() => {
    exOne = new ExerciseOneComponent();
  });

  it('should be visible by default', () => {
    expect(exOne.visible).toBe(true);
  });

  it('should toggle to false', () => {
    exOne.toggleVisibility();
    expect(exOne.visible).toBe(false);
  });
});
