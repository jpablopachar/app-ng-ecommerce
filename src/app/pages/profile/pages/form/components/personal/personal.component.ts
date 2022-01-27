import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';

export interface PersonalForm {
  name: string | null;
  photoURL: string | null;
  country: string | null;
}

@Component({
  selector: 'app-personal',
  template: `
    <form [formGroup]="form" novalidate autocomplete="off" class="personal">
      <div class="personal__photo">
        <div class="photo">
          <app-user-photo
            class="photo__img"
            [photoURL]="form.controls['photoURL'].value"
          ></app-user-photo>
          <div
            class="app-a"
            appFilesupload
            [crop]="true"
            (changed)="onPhotoChanged($event)"
          >
            Upload profile image
          </div>
        </div>
      </div>
      <app-form-field
        [required]="true"
        label="Name"
        [control]="form.controls['name']"
      >
        <app-input formControlName="name"></app-input>
      </app-form-field>
      <app-form-field
        [required]="true"
        label="Countries"
        [control]="form.controls['country']"
      >
        <app-autocomplete
          formControlName="country"
          [items]="dictionaries ? dictionaries.countries.controlItems : []"
        ></app-autocomplete>
      </app-form-field>
    </form>
    <code>
      {{ form.value | json }}
    </code>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';

      .personal {
        &__photo {
          display: flex;
          justify-content: center;
        }
      }

      .photo {
        display: inline-flex;
        align-items: center;
        align-content: center;
        padding-bottom: 20px;
        flex-direction: column;

        &__img {
          margin-bottom: 16px;
        }
      }

      .app-a {
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit, OnDestroy {
  @Input() value!: PersonalForm;
  @Input() dictionaries!: Dictionaries | null;
  @Output() changed;

  public form: FormGroup;

  private _destroy: Subject<any>;

  constructor(
    private readonly _stepperService: StepperService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _formBuilder: FormBuilder
  ) {
    this.changed = new EventEmitter<PersonalForm>();
    this._destroy = new Subject<any>();
    this.form = this._formBuilder.group({
      photoURL: [null],
      name: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
      country: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });
  }

  ngOnInit(): void {
    if (this.value) {
      this.form.patchValue(this.value);
    }

    this._stepperService.check$
      .pipe(takeUntil(this._destroy))
      .subscribe((type: 'next' | 'complete'): void => {
        if (!this.form.valid) {
          markFormGroupTouched(this.form);
          this.form.updateValueAndValidity();
          this._changeDetectorRef.detectChanges();
        } else {
          this.changed.emit(this.form.value);
        }

        this._stepperService[type].next(this.form.valid);
      });
  }

  public onPhotoChanged(url: any): void {
    if (url) {
      this.form.controls['photoURL'].setValue(url);
    }
  }

  ngOnDestroy(): void {
    this._destroy.next(null);
    this._destroy.complete();
  }
}
