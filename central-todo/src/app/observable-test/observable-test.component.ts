import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TestService } from './observable-test.service';

@Component({
  selector: 'app-observable-test',
  templateUrl: './observable-test.component.html',
  styleUrls: ['./observable-test.component.css']
})
export class ObservableTestComponent {

  constructor(private testService: TestService) {
    this.testService.getObservable()
      .subscribe(response => {
        console.log(response);
      });

    this.testService.start();

    setTimeout(() => {
      this.testService.stop();
    }, 10000);
  }

}
