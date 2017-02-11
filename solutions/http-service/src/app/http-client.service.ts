import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpClientService {

  constructor(private http: Http) { }

  get(url: string, success: Function, error: Function) {
    this.http.get(url).subscribe({ next: resp => success(resp), error: err => error(err) });
  }

}
