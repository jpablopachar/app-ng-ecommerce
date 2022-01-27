import {
  Component,
  EventEmitter, forwardRef, Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date',
  template: `
    <div class="date">
      <input
        class="app-input"
        type="text"
        readonly
        [matDatepicker]="picker"
        (dateChange)="onChanged($event)"
        (click)="picker.open()"
        [attr.disabled]="isDisabled ? true : null"
        [value]="inputValue"
        [min]="min"
        [max]="max"
        placeholder="{{ placeholder || 'Select a date' }}"
      />
      <mat-datepicker-toggle matSuffix [for]="picker" [disabled]="isDisabled">
      </mat-datepicker-toggle>
      <mat-datepicker #picker (closed)="onClosed()"></mat-datepicker>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .date {
        display: inline-flex;
      }

      :host-context(.form-field_error) {
        input {
          border: 1px solid $error;
        }
      }
    `,
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((): typeof DateComponent => DateComponent),
    multi: true
  }]
})
export class DateComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;

  @Output() changed: EventEmitter<number>;
  @Output() closed: EventEmitter<void>;

  public value: number;
  public isDisabled: boolean;

  constructor() {
    this.changed = new EventEmitter<number>();
    this.closed = new EventEmitter<void>();
    this.value = 0;
    this.isDisabled = false;
  }

  public get inputValue(): Date {
    return new Date(this.value);
  }

  public writeValue(value: number): void {
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

  public onChanged(event: MatDatepickerInputEvent<Date>): void {
    const value: number = event.value
      ? event.value.getTime()
      : new Date().getTime();

    this.value = value;

    this.propagateChange(value);
    this.changed.emit(value);
  }

  public onClosed(): void {
    this.propagateTouched();
    this.closed.emit();
  }

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};
}
