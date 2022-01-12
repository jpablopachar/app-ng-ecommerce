import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlItem, Value } from 'src/app/models';

@Component({
  selector: 'app-select',
  template: `
    <div class="select app-input" [class.select_disabled]="isDisabled">
      <mat-select
        [value]="value"
        [disabled]="isDisabled"
        (selectionChange)="onChanged($event)"
        (blur)="onBlur()"
      >
        <mat-option *ngFor="let item of items" [value]="item.value">
          {{ item.label }}
        </mat-option>
      </mat-select>
    </div>
  `,
  styles: [
    `
      @import 'styles/colors';

      .select {
        line-height: 36px;
        padding: 0 15px 0 15px;

        &_disabled {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
      }

      :host-context(.form-field_error) {
        .select {
          border: 1px solid $error;
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof SelectComponent => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed: EventEmitter<Value>;

  public value!: Value;
  public isDisabled!: boolean;

  constructor() {
    this.changed = new EventEmitter<Value>();
  }

  public writeValue(value: Value): void {
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

  public onChanged(event: MatSelectChange): void {
    const value: any = event.value ? event.value : null;

    this.value = value;

    this.propagateChange(value);
    this.changed.emit(value);
  }

  public onBlur(): void {
    this.propagateTouched();
  }

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};
}
