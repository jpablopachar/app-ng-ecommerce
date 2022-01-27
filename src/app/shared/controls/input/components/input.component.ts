import {
  Component, EventEmitter, forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <input
      type="text"
      class="app-input"
      [value]="value"
      [placeholder]="placeholder || ''"
      [attr.disabled]="isDisabled ? true : null"
      (keyup)="onKeyup($event)"
      (blur)="onBlur()"
    />
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

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
      useExisting: forwardRef((): typeof InputComponent => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Output() changed: EventEmitter<string>;

  public value: string;
  public isDisabled: boolean;

  constructor() {
    this.changed = new EventEmitter<string>();
    this.value = '';
    this.isDisabled = false;
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

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};
}
