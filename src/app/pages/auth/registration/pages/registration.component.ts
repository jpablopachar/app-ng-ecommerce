import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>User register</h1>
      </div>

      <form
        [formGroup]="form"
        (submit)="onSubmit()"
        (keyup.enter)="onSubmit()"
        novalidate
        autocomplete="off"
      >
        <div class="app-page__content">
          <app-form-field
            label="Email"
            [required]="true"
            [control]="form.controls['email']"
            [isInline]="false"
            [patternError]="regexErrors.email"
          >
            <app-input formControlName="email"></app-input>
          </app-form-field>

          <app-form-field
            label="Password"
            [required]="true"
            [control]="form.controls['password']"
            [isInline]="false"
            [patternError]="regexErrors.password"
          >
            <app-password formControlName="password"></app-password>
          </app-form-field>

          <app-form-field
            label="Repeat Password"
            [required]="true"
            [control]="form.controls['passwordRepeat']"
            [isInline]="false"
            [patternError]="regexErrors.password"
          >
            <app-password formControlName="passwordRepeat"></app-password>
          </app-form-field>

          <div class="error" [class.error_active]="form.hasError('repeat')">
            The password does not match
          </div>
        </div>

        <div class="app-page__footer">
          <app-button type="submit">Send</app-button>
        </div>
      </form>

      <app-spinner *ngIf="loading$ | async"></app-spinner>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .app-page {
        max-width: 500px;
      }

      .error {
        opacity: 0;
        font-size: 12px;
        color: $error;
        padding: 4px 0 16px 0;

        &_active {
          opacity: 1;
        }
      }
    `,
  ],
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  public loading$!: Observable<boolean | null>;
  public regexErrors: {
    email: string;
    password: string;
    number: string;
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<fromRoot.State>
  ) {
    this.regexErrors = regexErrors;
    this.form = this._formBuilder.group(
      {
        email: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(128),
              Validators.pattern(regex.email),
            ],
          },
        ],
        password: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(30),
              Validators.pattern(regex.password),
            ],
          },
        ],
        passwordRepeat: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(30),
              Validators.pattern(regex.password),
            ],
          },
        ],
      },
      { validator: this.repeatPasswordValidator }
    );
  }

  ngOnInit(): void {
    this.loading$ = this._store.pipe(select(fromUser.getLoading));
  }

  private repeatPasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password: string = control.get('password')?.value;
    const passwordRepeat: string = control.get('passwordRepeat')?.value;

    return password !== passwordRepeat ? { repeat: true } : null;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      const credentials: fromUser.EmailPasswordCredentials = {
        email,
        password,
      };

      this._store.dispatch(new fromUser.SignUpEmail(credentials));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
