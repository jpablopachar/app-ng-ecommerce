import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <div class="app-page">
      <div class="app-page__header">
        <h1>Login</h1>
      </div>
      <form
        [formGroup]="form"
        autocomplete="off"
        (submit)="onSubmit()"
        (keyup.enter)="onSubmit()"
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
        </div>
        <div class="app-page__footer">
          <app-button type="submit">Login</app-button>
        </div>
      </form>
      <app-spinner *ngIf="loading$ | async"></app-spinner>
    </div>
  `,
  styles: [
    `
      .app-page {
        max-width: 500px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  public loading$!: Observable<boolean | null>;
  public form!: FormGroup;
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
    this.form = this._formBuilder.group({
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
          updateOn: 'change',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
    });
  }

  ngOnInit(): void {
    this.loading$ = this._store.pipe(select(fromUser.getLoading));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email,
        password,
      };

      this._store.dispatch(new fromUser.SignInEmail(credentials));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
