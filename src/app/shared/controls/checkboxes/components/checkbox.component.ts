import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from '@app/models/client';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checkboxes">
      <div *ngFor="let item of items">
        <label class="checkbox" [class.checkbox_disabled]="isDisabled">
          {{ item.label }}
          <input
            type="checkbox"
            class="checkbox__input"
            [value]="item.value"
            [attr.disabled]="isDisabled ? true : null"
            [checked]="isChecked(item.value)"
            (change)="onChanged(item.value, $event)"
          />
          <span class="checkbox__checkmark"></span>
        </label>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .checkbox {
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
            & ~ .checkbox__checkmark {
              background-color: $primary;

              &:after {
                display: block;
                left: 7px;
                top: 3px;
                width: 4px;
                height: 8px;
                border: solid #fff;
                border-width: 0 3px 3px 0;
                transform: rotate(45deg);
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
          border-radius: 4px;
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
          .checkbox__checkmark {
            background-color: #ccc;
          }

          .checkbox__input:checked ~ .checkbox__checkmark {
            background-color: $primary-dark;
          }
        }
      }

      :host-context(.form-field_error) {
        .checkbox__checkmark {
          border: 1px solid $error;
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof CheckboxComponent => CheckboxComponent
      ),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() items!: ControlItem[];
  @Output() changed: EventEmitter<Value[]>;

  public value: Value[];
  public isDisabled: boolean;

  constructor() {
    this.value = [];
    this.isDisabled = false;
    this.changed = new EventEmitter<Value[]>();
  }

  public writeValue(value: Value[]): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onChanged(value: Value, checked: Event): void {
    const { target } = checked;
    const resultado: boolean = (target as HTMLInputElement).checked;

    const selected: Value[] = this.getSelected(value, resultado);

    this.value = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  public isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];
    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      const index: number = selected.indexOf(value);
      selected.splice(index, 1);
    }

    return selected.length ? selected : [];
  }

  private propagateChange: any = (): void => {};
}
