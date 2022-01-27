import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';
import { EmployeeForm } from './roles/employee/employee.component';
import { RecruiterForm } from './roles/recruiter/recruiter.component';

export interface ProfessionalForm {
  about?: string | null;
  roleId?: string | null;
  role?: RecruiterForm | EmployeeForm | null;
}

@Component({
  selector: 'app-professional',
  template: `
    <form [formGroup]="form" novalidate autocomplete="off">
      <app-form-field
        label="Select your role"
        [required]="true"
        [control]="form.controls['roleId']"
      >
        <app-radio
          formControlName="roleId"
          [items]="dictionaries ? dictionaries.roles.controlItems : []"
        ></app-radio>
      </app-form-field>
      <app-form-field
        label="Tell us about yourself"
        [control]="form.controls['about']"
      >
        <app-input formControlName="about"></app-input>
      </app-form-field>
      <ng-container [ngSwitch]="form.controls['roleId'].value">
        <app-recruiter
          *ngSwitchCase="'recruiter'"
          [parent]="form"
          name="role"
          [value]="value ? value.role : value"
          [dictionaries]="dictionaries"
        >
        </app-recruiter>
        <app-employee
          *ngSwitchCase="'employee'"
          [parent]="form"
          name="role"
          [value]="value ? value.role : value"
          [dictionaries]="dictionaries"
        >
        </app-employee>
      </ng-container>
    </form>
    <code>
      {{ form.value | json }}
    </code>
  `,
  styles: [],
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  @Input() value!: ProfessionalForm | any;
  @Input() dictionaries!: Dictionaries | null;
  @Output() changed: EventEmitter<ProfessionalForm>;

  public form: FormGroup;
  public regexErrors;

  private destroy: Subject<any>;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _stepper: StepperService
  ) {
    this.regexErrors = regexErrors;
    this.changed = new EventEmitter<ProfessionalForm>();
    this.destroy = new Subject<any>();
    this.form = this._formBuilder.group({
      roleId: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      about: [
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

    this._stepper.check$
      .pipe(takeUntil(this.destroy))
      .subscribe((type: 'next' | 'complete'): void => {
        if (!this.form.valid) {
          markFormGroupTouched(this.form);
          this.form.updateValueAndValidity();
          this._changeDetectorRef.detectChanges();
        } else {
          this.changed.emit(this.form.value);
        }

        this._stepper[type].next(this.form.valid);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
