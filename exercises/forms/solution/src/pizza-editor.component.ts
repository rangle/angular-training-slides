import {Component, EventEmitter} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import Pizza from './pizza';
import CustomValidators from './custom-validators';

@Component({
  selector: 'rio-pizza-editor',
  styles:[`
  .field.ng-invalid { border-color: #ff4136; }
  .field.ng-invalid:focus{ box-shadow: 0 0 0 2px rgba(255,65,54,.5); }

  .field.ng-valid:focus { box-shadow: 0 0 0 2px rgba(46, 204, 64, 0.5); }
  .field.ng-valid { border-color: #2ecc40; }
  `],
  template: require('./pizza-editor.component.html'),
  inputs: ['pizza'],
  outputs: ['pizzaChange']
})
export class PizzaEditorComponent {
  pizzaForm: FormGroup;
  pizza: Pizza;
  pizzaChange = new EventEmitter();

  constructor(
    builder: FormBuilder
  ) {
    this.pizzaForm = builder.group({
      cheese: new FormControl('', [Validators.required]),
      sauce: new FormControl('', [Validators.required]),
      topping: new FormControl('', [CustomValidators.acceptableTopping]),
      name: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.pizzaChange.emit(this.pizzaForm.value);
  }
}
