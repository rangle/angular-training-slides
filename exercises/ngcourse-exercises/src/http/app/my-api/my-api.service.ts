import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request } from '@angular/http';
import { Observable, } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable()
export class MyApiService {

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    return Observable.throw('Get Posts Not Implemented');
  }

  getPost(id: number): Observable<Post> {
    return Observable.throw('Get Post Not Implemented');
  }

  handleError(err: any): ErrorObservable {
    return Observable.throw('Get Handle Error Not Implemented');
  }

  private request<T>(url: string, method: RequestMethod = RequestMethod.Get, body?: any): Observable<T> {
    return Observable.throw('Not Implemented');
  }
}

