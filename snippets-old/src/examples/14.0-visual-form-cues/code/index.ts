import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  styles: [`
    input.ng-touched.ng-invalid {
      border-style: solid;
      border-width: 1px;
      border-color: red;
    }
  `],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  registerUser(form: NgForm) {
    console.log(form.value);
    // in the real world, do something useful with the data
  }
}
