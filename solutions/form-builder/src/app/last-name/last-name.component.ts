import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['./last-name.component.css']
})
export class LastNameComponent implements OnInit {
  @Output() formValueChange = new EventEmitter();
  lastNameForm: FormGroup;

  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  constructor(private builder: FormBuilder) {
    this.lastNameForm = this.builder.group({
      lastName: this.lastName
    });
  }

  ngOnInit(): void {
    this.lastNameForm.valueChanges.subscribe((formData) => {
      this.formValueChange.emit(formData.lastName);
    });
  }
}
