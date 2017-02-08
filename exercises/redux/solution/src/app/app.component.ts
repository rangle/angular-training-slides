import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NgRedux} from 'ng2-redux';
import {
  addPassenger,
  removePassenger
} from '../actions/train';
import {Observable} from 'rxjs';

@Component({
  selector: 'child',
  template: `
    <div>
      <label>Passengers:</label>
      <ul *ngFor="let passenger of passengers; let i = index">
        <li>
          {{passenger}} - <button (click)="onRemovePassenger.emit(i)">Remove</button>
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  @Input() passengers;
  @Output() onRemovePassenger = new EventEmitter<number>();

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  passengers$: Observable<string[]>;

  passengerControl = new FormControl();

  passengerSubscription;

  constructor(private ngRedux: NgRedux<any>) {}

  ngOnInit() {
    this.passengers$ = this.ngRedux.select(state => state.train.passengers);
  }

  ngOnDestroy() {
    this.passengerSubscription.unsubscribe();
  }

  addPassenger() {
    this.ngRedux.dispatch(addPassenger(this.passengerControl.value));
    this.passengerControl.setValue(undefined);
  }

  removePassenger(index) {
    this.ngRedux.dispatch(removePassenger(index));
  }

}
