
import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, RequestMethod } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MyApiService, API_URL, Post } from './my-api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

const POST_ONE: Post = {
  userId: 1,
  id: 1,
  title: 'post title',
  body: 'post body'
};

const buildResponse = (body: any) => {
  return new Response(new ResponseOptions({
    body: body,
  }));
};

describe('MyApi HTTP Example', () => {

  /* STUFF WE DON'T WANT THEM TO WORRY ABOUT (YET?) */
  let apiService: MyApiService;
  let backend: MockBackend;
  let injector: ReflectiveInjector;
  let lastConnection: MockConnection;

  beforeEach(() => {

    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      MyApiService,
    ]);
    apiService = injector.get(MyApiService);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe((connection: any) => lastConnection = connection);
  });

  /* END OF STUFF WE POSSIBLY DONT WANT THEM TO CARE ABOUT YET */

  /*
   Implement a getPosts method that makes a get request to  https://jsonplaceholder.typicode.com/posts'
  */

  it('getPosts() should query API_URL', () => {

    apiService.getPosts();
    expect(lastConnection).toBeDefined('no http service connection at all?');
    expect(lastConnection.request.url).toEqual(API_URL, 'incorrect url');
    expect(lastConnection.request.method).toEqual(RequestMethod.Get, 'wrong request method');

  });

  /*
  Ensure getPosts returns Observable<Post[]> and not Observable<Response>.
  hint: We want to map from one type to another.

  */
  it('getPosts() should return a list of posts', fakeAsync(() => {
    let results: Post[];
    apiService.getPosts().subscribe(posts => results = posts);
    lastConnection.mockRespond(buildResponse([POST_ONE]));
    tick();
    expect(results).toEqual([POST_ONE], `Did not get a Post object back`);

  }));

  /*
  Implement a getPost(id) that makes a request to:
    https://jsonplaceholder.typicode.com/posts/{id}
  Where {id} is the value you passed in.

  example:
  https://jsonplaceholder.typicode.com/posts/1
  */
  it('getPost(id) should query for a specific post', () => {
    const expectedUrl = `${API_URL}/1`;
    apiService.getPost(1);

    expect(lastConnection).toBeDefined('no http service connection at all?');
    expect(lastConnection.request.url).toEqual(expectedUrl);
  });

  /*
  Ensure getPosts returns Observable<Post> and not Observable<Response>.
  hint: We want to map from one type to another.
  */
  it('getPost(id) return a post object', fakeAsync(() => {
    let result: Post;
    apiService.getPost(1).subscribe(post => result = post);
    lastConnection.mockRespond(buildResponse(POST_ONE));
    tick();
    expect(result).toEqual(POST_ONE, 'Should have my data');

  }));

  /*
  Use the RxJs `catch` operator to handle exceptions.
  */

  it('getPost(id) should catch errors in handleError and rethrow them.', fakeAsync(() => {
    let result: any;
    let error: any;
    const spy = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getPost(1)
      .catch(err => {
        error = err;
        return Observable.throw(err);
      })
      .subscribe(post => {
        result = post;
      });


    lastConnection.mockError(new Error('error'));
    tick();
    expect(result).toBeUndefined();
    expect(error).toBeDefined();
    expect(apiService.handleError).toHaveBeenCalled();
  }));

  /*
 Use the RxJs `catch` operator to handle exceptions.
 */

  it('getPosts() should catch errors in handleError and rethrow them.', fakeAsync(() => {

    let result: any;
    let error: any;
    const spy = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getPosts()
      .catch(err => {
        error = err;
        return Observable.throw(err);
      })
      .subscribe(post => {
        result = post;
      });


    lastConnection.mockError(new Error('error'));
    tick();
    expect(result).toBeUndefined();
    expect(error).toBeDefined();
    expect(apiService.handleError).toHaveBeenCalled();
  }));
});
