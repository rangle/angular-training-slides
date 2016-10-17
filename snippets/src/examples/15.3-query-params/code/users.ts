import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  moduleId: module.id,
  selector: 'users',
  template: `Hello {{ name }}`,
})
export class UsersComponent implements OnInit, OnDestroy {
  name: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
