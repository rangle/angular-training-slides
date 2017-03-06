import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserService } from './user.service';

export const fakeUserList = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
  }
];

describe('When testing the UserService', () => {

  beforeEach(() => {
    const fakeHttp = {
      get: () => Observable.of({
        json: () => fakeUserList
      })
    };
    spyOn(fakeHttp, 'get').and.callThrough();

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: Http, useValue: fakeHttp }
      ]
    });
  });

  describe('When calling the method "getUserList"', () => {

    it('Should try to use the correct URL', () => {
      const http = TestBed.get(Http);
      const service: UserService = TestBed.get(UserService);
      const expectedUrl = 'https://jsonplaceholder.typicode.com/users';

      service.getUserList();
      expect(http.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('Should get back an Observable of Users', () => {
      const service: UserService = TestBed.get(UserService);
      service.getUserList().subscribe(users => {
        expect(users).toEqual(fakeUserList);
      });
    });

  });

});
