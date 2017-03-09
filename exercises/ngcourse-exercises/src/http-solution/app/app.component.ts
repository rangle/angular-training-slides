import { Component, OnInit } from '@angular/core';
import { MyApiService } from './my-api/my-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Http Example';
  posts: any[];
  constructor(private myApi: MyApiService) { }

  ngOnInit() {
    this.myApi.getPosts().subscribe(n => {
      this.posts = n;
    });
  }
}
