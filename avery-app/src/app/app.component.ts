import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

// import { React } from 'react';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'app works!';

  // An example of how we might use getters and setters to run logic when data is being read or written
  // private _title: string;

  // @Input()
  // set title (val) {
  //   // I can run some logic whenever a value gets set
  //   this._title = val;
  // }

  // get title () {
  //   return this._title;
  // }


  constructor(
    private router: Router,
    private location: Location,
    // private activatedRoute: ActivatedRoute,
    // private cdr: ChangeDetectorRef,
    private element: ElementRef
  ) {}

  ngOnInit(){

    // How we can manually control change detection in a component
    // this.cdr.detach();
    // this.cdr.reattach();
    // this.cdr.markForCheck()

    // When setting with getters/setters, we can run logic when this value is getting set
    // this.title = 'someothervalue';

    // One possible way to instantiate a React component inside of an Angular component
    // ReactDOM.render(
    //   MyRootReactComponent(),
    //   this.element.nativeElement
    // );
  }

  ngOnChanges() {

  }

  setTitle(title: string) {
    this.title = title;
  }

  back() {
    // A wrapper around window.history.back();
    this.location.back();
  }

  forward() {
    this.location.forward();
  }

  // How we might programmatically navigate to a route
  navigateToGreeterChild() {
    this.router.navigate(['greeter', 'child', 'Joe']);
  }
}
