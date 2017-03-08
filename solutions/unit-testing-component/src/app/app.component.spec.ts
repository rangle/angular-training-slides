import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('When testing the AppComponent', () => {
  describe('When calling the "getMessage" method', () => {

    it('Should return the correct string', () => {
      const component = new AppComponent();
      const message = component.getMessage();
      expect(message).toBe('Insert a dummy message');
    });

  });

  describe('When testing the template', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ AppComponent ]
      });
    });

    it('Should show the correct message in the paragraph', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const debug = fixture.debugElement.query(By.css('p'));
      expect(debug.nativeElement.textContent).toBe('Insert a dummy message here');
    });

  });

});
