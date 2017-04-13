import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'avy-greeter-child',
  templateUrl: './greeter-child.component.html',
  styleUrls: ['./greeter-child.component.css']
})
export class GreeterChildComponent implements OnInit {
  currentName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentName = params['name'];
    });
  }

}
