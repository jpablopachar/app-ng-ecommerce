import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from '@app/models/client';

@Component({
  selector: 'app-radio',
  template: `<div class="radios">
    <div *ngFor="let item of items">
      <label class="radio" [class.radio_disabled]="isDisabled">
        {{ item.label }}
        <input
          type="radio"
          class="radio__input"
          [value]="item.value"
          [attr.disabled]="isDisabled ? true : null"
          [checked]="isChecked(item.value)"
          (change)="onChanged(item.value)"
        />
        <span class="radio__checkmark"></span>
      </label>
    </div>
  </div>`,
  styles: [
    `
      @import 'src/styles/base/colors';

      .radio {
        display: block;
        position: relative;
        text-indent: 30px;
        margin: 8px 0;
        padding: 0 20px 0 0;

        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &__input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;

          &:checked {
            & ~ .radio__checkmark {
              background-color: $primary;

              &:after {
                display: block;
                background: #fff;
                left: 6px;
                top: 6px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
              }
            }
          }
        }

        &__checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background-color: #eee;

          &:after {
            content: '';
            position: absolute;
            display: none;
          }
        }

        &_disabled {
          color: rgba(0, 0, 0, 0.38);
        }

        &:hover {
          .radio__checkmark {
            background-color: #ccc;
          }

          .radio__input:checked ~ .radio__checkmark {
            background-color: $primary-dark;
          }
        }
      }

      :host-context(.form-field_error) {
        .radio__checkmark {
          border: 1px solid $error;
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof RadioComponent => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  @Input() items!: ControlItem[];
  @Output() changed: EventEmitter<Value>;

  public value!: Value;
  public isDisabled: boolean;

  constructor() {
    this.changed = new EventEmitter<Value>();
    this.isDisabled = true;
  }

  public writeValue(value: Value): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onChanged(value: Value): void {
    this.value = value;

    this.propagateChange(value);
    this.changed.emit(value);
  }

  public isChecked(value: Value): boolean {
    return this.value === value;
  }

  private propagateChange: any = (): void => {};
}
