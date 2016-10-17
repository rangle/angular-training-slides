import {FormControl} from '@angular/forms';

interface IValidation {
  [key: string]: boolean;
}

export default class CustomValidators {
  static acceptableTopping(control: FormControl): IValidation {
    const acceptableToppings = ['tomato', 'basil', 'garlic', 'eggplant', 'onion', 'salami', 'prosciutto'];
    const chosenTopping = control.value.toLowerCase();
    const isValid =  acceptableToppings.includes(chosenTopping);

    return isValid ? null : { 'acceptableTopping': true };
  }
}
