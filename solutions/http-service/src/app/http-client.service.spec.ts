/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientService]
    });
  });

  it('should ...', inject([HttpClientService], (service: HttpClientService) => {
    expect(service).toBeTruthy();
  }));
});
