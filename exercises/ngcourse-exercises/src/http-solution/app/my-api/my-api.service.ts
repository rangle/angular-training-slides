import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable()
export class MyApiService {

  constructor(private http: Http) { }
  getPosts(): Observable<Post[]> {
    return this.request<Post[]>(API_URL);
  }

  getPost(id: number): Observable<Post> {
    return this.request<Post>(`${API_URL}/${id}`);
  }

  handleError(err: any) {
    console.log('bad things');
    return Observable.throw(err);
  }

  private request<T>(url: string, method: RequestMethod = RequestMethod.Get, body?: any): Observable<T> {
    const request = new Request({
      url, method, body
    });
    return this.http
      .request(request)
      .map(n => n.json())
      .catch(err => this.handleError(err));
  }
}

