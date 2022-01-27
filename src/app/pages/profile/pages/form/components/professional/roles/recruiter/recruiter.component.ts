import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { EmployeeForm } from '../employee/employee.component';
import { ExperienceForm } from '../employee/experience/experience.component';

export interface RecruiterForm {
  companyName: string;
  employeesCount: number;
  experiences: ExperienceForm[];
}

@Component({
  selector: 'app-recruiter',
  template: `
    <form [formGroup]="form" novalidate autocomplete="off">
      <app-form-field
        label="Company name"
        [required]="true"
        [control]="form.controls['companyName']"
      >
        <app-input formControlName="companyName"></app-input>
      </app-form-field>
      <app-form-field
        label="Employees cant"
        [required]="true"
        [control]="form.controls['employeesCount']"
      >
        <app-input formControlName="employeesCount"></app-input>
      </app-form-field>
    </form>
  `,
  styles: [],
})
export class RecruiterComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() value!: RecruiterForm | EmployeeForm;
  @Input() dictionaries!: Dictionaries | null;

  public form: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      companyName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      employeesCount: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
    });
  }

  ngOnInit(): void {
    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
