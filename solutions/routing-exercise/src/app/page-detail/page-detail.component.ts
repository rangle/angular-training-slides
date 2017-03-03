import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-detail',
  templateUrl: 'page-detail.component.html',
  styleUrls: ['page-detail.component.css']
})
export class PageDetailComponent implements OnInit {
  private pageId: number;
  private subscription: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.pageId = params['id'];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
