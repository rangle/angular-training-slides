import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MyApiService } from './my-api/my-api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const POST_ONE = {
  userId: 1,
  id: 1,
  title: 'post title',
  body: 'post body'
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ], providers: [{
        provide: MyApiService, useValue: {
          getPosts() { return Observable.of([POST_ONE]); }
        }
      }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Http Example'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Http Example');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Http Example');
  }));
});


