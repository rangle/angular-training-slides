import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent implements OnInit {
  currentName = 'world';
  greeting: string;

  names = [
    'john',
    'philip',
    'sally',
    'mike'
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.select('greeter')
      .subscribe((greeting: string) => this.greeting = greeting);

    this.route.params.subscribe(params => {
      this.currentName = params['name'];
    });

    // this.route.queryParams.subscribe(params => {
    //   this.currentName = params['name'];
    // });
  }

  setName(name: string) {
    this.currentName = name;
  }

  addName(name: string) {
    this.names = this.names.concat(name);
  }

}
