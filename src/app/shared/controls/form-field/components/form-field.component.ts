import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  template: `
    <div
      class="form-field"
      [class.form-field_error]="hasError()"
      [class.form-field_inline]="isInline"
    >
      <label class="form-field__label">
        {{ label }}
        <span class="form-field__req" *ngIf="required">*</span>
      </label>
      <div class="form-field__control">
        <ng-content></ng-content>
        <div class="form-field__error">
          <ng-container *ngIf="control && errorKey" [ngSwitch]="errorKey">
            <span *ngSwitchCase="'min'"
              >Minimum
              {{ control.errors ? control.errors[errorKey].min : 0 }}</span
            >
            <span *ngSwitchCase="'max'"
              >Maximum
              {{ control.errors ? control.errors[errorKey].max : 100000 }}</span
            >
            <span *ngSwitchCase="'required'"
              >This field is required</span
            >
            <span *ngSwitchCase="'requiredtrue'"
              >This field is required</span
            >
            <span *ngSwitchCase="'minlength'"
              >Minimun number of characters
              {{
                control.errors ? control.errors[errorKey].requiredLength : 0
              }}</span
            >
            <span *ngSwitchCase="'maxlength'"
              >Maximun number of characters
              {{
                control.errors ? control.errors[errorKey].requiredLength : 0
              }}</span
            >
            <span *ngSwitchCase="'pattern'">
              <span *ngIf="patternError">{{ patternError }}</span>
              <span *ngIf="!patternError"
                >Regular expression has no match</span
              >
            </span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .form-field {
        padding-bottom: 8px;

        &__label {
          display: flex;
          margin: 0 0 6px 0;
        }

        &__control {
          display: block;
        }

        &__error {
          opacity: 0;
          font-size: 12px;
          color: $error;
          padding: 4px 0;
          min-height: 22px;
        }

        span {
          display: block;
        }

        &_error {
          .form-field__error {
            opacity: 1;
          }
        }

        &_inline {
          display: flex;

          > .form-field__label {
            padding: 10px 12px 10px 0;
            width: 30%;
          }

          > .form-field__control {
            width: 70%;
          }
        }
      }
    `,
  ],
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() required!: boolean;
  @Input() isInline: boolean;
  @Input() control!: AbstractControl;
  @Input() patternError!: string;

  constructor() {
    this.isInline = true;
  }

  public get errorKey(): string | null {
    return (
      this.control && this.control.errors && Object.keys(this.control.errors)[0]
    );
  }

  public hasError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }
}
