import {Component, EventEmitter} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import Pizza from './pizza';

@Component({
  selector: 'rio-pizza-editor',
  template: require('./pizza-editor.component.html'),
  inputs: ['pizza'],
  outputs: ['pizzaChange']
})
export class PizzaEditor {
  pizzaForm: FormGroup;
  pizza: Pizza;
  pizzaChange: EventEmitter<any> = new EventEmitter();

  constructor(
  ) {
  }

  onSubmit() {
    this.pizzaChange.emit(this.pizzaForm.value);
  }
}
