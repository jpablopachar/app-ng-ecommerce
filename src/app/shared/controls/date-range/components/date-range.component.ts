import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup, NG_VALUE_ACCESSOR
} from '@angular/forms';

export interface Value {
  from: number;
  to: number;
}

export interface Placeholder {
  from: string;
  to: string;
}

@Component({
  selector: 'app-date-range',
  template: `
    <div class="date-range">
      <form [formGroup]="form" novalidate autocomplete="off">
        <div class="date-range__items">
          <app-date
            formControlName="from"
            (closed)="onClosed()"
            [placeholder]="placeholder?.from || 'From'"
            (changed)="onChanged()"
            [max]="max"
          >
          </app-date>
          <span class="date-range__dash">&mdash;</span>
          <app-date
            formControlName="to"
            (closed)="onClosed()"
            [placeholder]="placeholder?.to || 'To'"
            (changed)="onChanged()"
            [min]="min"
          >
          </app-date>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .date-range {
        &__items {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        &__dash {
          display: block;
          padding-right: 12px;
        }
      }

      :host-context(.form-field_error) {
        .input {
          border: 1px solid $error;
        }
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof DateRangeComponent => DateRangeComponent
      ),
      multi: true,
    },
  ],
})
export class DateRangeComponent implements ControlValueAccessor {
  @Input() placeholder!: Placeholder;
  @Output() changed: EventEmitter<Value>;

  public form: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.changed = new EventEmitter<Value>();
    this.form = this._formBuilder.group({
      from: [null],
      to: [null],
    });
  }

  public get min(): Date {
    const from: any = this.form.controls['from'].value;

    return from ? new Date(from) : new Date();
  }

  public get max(): Date {
    const to: any = this.form.controls['to'].value;

    return to ? new Date(to) : new Date();
  }

  public writeValue(value: Value): void {
    this.form.patchValue(value || {});
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public onChanged(): void {
    const value: any = { ...this.form.value };

    this.propagateChange(value);
    this.changed.emit(value);
  }

  public onClosed(): void {
    this.propagateTouched();
  }

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};
}
