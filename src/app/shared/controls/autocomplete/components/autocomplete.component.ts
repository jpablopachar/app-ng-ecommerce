import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { ControlItem } from '@app/models/client';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil
} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  template: `
    <div class="autocomplete">
      <input
        class="app-input"
        type="text"
        #search
        [placeholder]="placeholder || 'Enter a search'"
        [formControl]="form"
        [matAutocomplete]="auto"
        (blur)="onBlur()"
      />
      <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
        <mat-option *ngFor="let option of options$ | async" [value]="option">
          <div class="option">
            <div class="option__icon" *ngIf="option.icon">
              <span [ngClass]="option.icon.cssClass"></span>
            </div>
            <div
              class="option__label"
              [innerHtml]="option.label | highlight: search.value"
            ></div>
          </div>
        </mat-option>
      </mat-autocomplete>
    </div>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .autocomplete {
        position: relative;

        &__options {
          position: absolute;
        }
      }

      .option {
        display: flex;
        align-items: center;

        &__icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
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
        (): typeof AutocompleteComponent => AutocompleteComponent
      ),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed: EventEmitter<string | number | boolean>;

  public form: FormControl;
  public options$!: Observable<ControlItem[]>;

  private _autocompleteSubj: Subject<any>;

  constructor() {
    this.changed = new EventEmitter<string | number | boolean>();
    this.form = new FormControl();
    this._autocompleteSubj = new Subject<any>();
  }

  ngOnInit(): void {
    this.options$ = this.form.valueChanges.pipe(
      startWith(''),
      filter(
        (value: any): boolean =>
          typeof value === 'string' || typeof value === 'object'
      ),
      map((value: any): any =>
        typeof value === 'string' ? value : value.label
      ),
      map((label: any): ControlItem[] =>
        label ? this.filter(label) : this.items.slice()
      )
    );

    this.form.valueChanges
      .pipe(takeUntil(this._autocompleteSubj), distinctUntilChanged())
      .subscribe((item: any): void => {
        const value: any = typeof item === 'object' ? item.value : '';

        this.propagateChange(value);
        this.changed.emit(value);
      });
  }

  private filter(value: string): ControlItem[] {
    const filterValue: string = value.toLowerCase();

    return this.items.filter((item: ControlItem): boolean | undefined =>
      item.label?.toLowerCase().includes(filterValue)
    );
  }

  public writeValue(value: string | number | boolean): void {
    const selectedOption: ControlItem | undefined = this.items.find(
      (item: ControlItem): boolean => item.value === value
    );

    this.form.setValue(selectedOption);
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

  public displayFn(item?: ControlItem): string {
    return item ? (item.label as string) : '';
  }

  public onBlur(): void {
    this.propagateTouched();
  }

  private propagateChange: any = (): void => {};

  private propagateTouched: any = (): void => {};

  ngOnDestroy(): void {
    this._autocompleteSubj.next('');
    this._autocompleteSubj.complete();
  }
}
