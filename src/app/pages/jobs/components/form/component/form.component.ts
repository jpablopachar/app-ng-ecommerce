import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { markFormGroupTouched, regexErrors } from '@app/shared';
import * as fromRoot from '@app/store';
import { Store } from '@ngrx/store';
import * as fromList from '../../../store/list';
import { Job } from '../../../store/list';

@Component({
  selector: 'app-form',
  template: `
    <div class="form">
      <form
        [formGroup]="form"
        novalidate
        autocomplete="off"
        (ngSubmit)="onSubmit()"
      >
        <app-form-field
          label="Title"
          [required]="true"
          [control]="form.controls['title']"
        >
          <app-input formControlName="title"></app-input>
        </app-form-field>
        <app-form-field
          label="Salary"
          [required]="true"
          [control]="form.controls['salary']"
        >
          <app-input formControlName="salary"></app-input>
        </app-form-field>
        <div class="form__actions">
          <app-button type="submit">Save</app-button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .form {
        &__actions {
          display: flex;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  public regexErrors: {
    email: string;
    password: string;
    number: string;
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromRoot.State>,
    private readonly _dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { value: Job }
  ) {
    this.regexErrors = regexErrors;
    this.form = this._formBuilder.group({
      title: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
      salary: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
    });
  }

  ngOnInit(): void {
    if (this.data.value) {
      this.form.patchValue(this.data.value);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      if (this.data.value) {
        const updateJob = { ...this.data.value, ...this.form.value };
        this._store.dispatch(new fromList.Update(updateJob));
      } else {
        this._store.dispatch(new fromList.Create(this.form.value));
      }

      this._dialogRef.close();
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
