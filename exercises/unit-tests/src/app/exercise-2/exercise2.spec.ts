import { TestBed, async, inject } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {destroyPlatform} from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { ExerciseTwoComponent } from './index';
import { MessageService } from '../services/message';

class MockMessageService {

}

describe('Exercise Two Component', () => {
  let fixture;

  beforeEach(() => destroyPlatform());

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
    
    TestBed.configureTestingModule({
      // imports: [
      //   CommonModule,
      //   BrowserModule,
      // ],
      // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        ExerciseTwoComponent
      ],
      providers: [
        // { provide: MessageService, useClass: MockMessageService },
        MessageService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTwoComponent);
    fixture.detectChanges();
  });

  it('Should initalize the component', () => {
     expect(fixture.componentInstance).toBeTruthy();
  });

  it('Should get message', async(inject([], () => {
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').innerText).toEqual('Hello World');
      });
  })));

});
