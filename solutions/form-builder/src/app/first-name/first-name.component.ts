import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['./first-name.component.css']
})
export class FirstNameComponent implements OnInit {
  @Output() formValueChange = new EventEmitter();
  @Input() firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  firstNameForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.firstNameForm = this.builder.group({
      firstName: this.firstName
    });
  }

  ngOnInit(): void {
    this.firstNameForm.valueChanges.subscribe((formData) => {
      this.formValueChange.emit(formData.firstName);
    });
  }
}
