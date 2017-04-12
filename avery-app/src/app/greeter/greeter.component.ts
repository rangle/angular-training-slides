import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store';

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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('greeter')
      .subscribe((greeting: string) => this.greeting = greeting);
  }

  setName(name: string) {
    this.currentName = name;
  }

  addName(name: string) {
    this.names = this.names.concat(name);
  }

}
