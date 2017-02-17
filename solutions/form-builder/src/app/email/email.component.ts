import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Output() formValueChange = new EventEmitter();
  emailForm: FormGroup;
  email = new FormControl('', [
    Validators.required,
    isValidEmail
  ]);

  constructor(private builder: FormBuilder) {
    this.emailForm = this.builder.group({
      email: this.email
    });
  }

  ngOnInit(): void {
    this.emailForm.valueChanges.subscribe((formData) => {
      this.formValueChange.emit(formData.email);
    });
  }
}

function isValidEmail(input: FormControl) {
  const emailRegex = /\S+@\S+\.\S+/;
  const isValid = emailRegex.test(input.value);

  return isValid ? null : { invalidEmail: true };
}
