import {
  Component, EventEmitter, forwardRef,
  Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  template: `
    <div class="password">
      <input
        type="text"
        class="app-input"
        [value]="value"
        [placeholder]="placeholder || 'Password'"
        [attr.disabled]="isDisabled ? true : null"
        (keyup)="onKeyup($event)"
        (blur)="onBlur()"
        [attr.type]="passwordType"
      />
      <div class="password__actions" (click)="togglePassword()">
        <span>{{ passwordType === 'password' ? 'Show' : 'Hide' }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'styles/colors';
      .password {
        display: flex;

        &__actions {
          min-width: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }

      :host-context(.form-field_error) {
        input {
          border: 1px solid $error;
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof PasswordComponent => PasswordComponent
      ),
      multi: true,
    },
  ],
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Output() changed: EventEmitter<string>;

  public value!: string;
  public isDisabled!: boolean;
  public passwordType: PasswordType;

  constructor() {
    this.changed = new EventEmitter<string>();
    this.passwordType = 'password';
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onKeyup(event: Event): void {
    const { target } = event;

    this.value = (target as HTMLInputElement).value;

    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  public onBlur(): void {
    this.propagateTouched();
  }

  public togglePassword(): void {
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
  }

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};
}
