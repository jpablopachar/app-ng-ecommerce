import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

export interface Period {
  from: number;
  to: number;
}

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

@Component({
  selector: 'app-experience',
  template: `
    <form [formGroup]="parent" class="experiences">
      <div [formArrayName]="name" *ngIf="parent.controls[name]">
        <div
          class="experience"
          *ngFor="
            let experience of getControls();
            let i = index;
            let first = first
          "
        >
          <div [formGroupName]="i">
            <app-form-field
              label="Company"
              [required]="true"
              [control]="getControl(experience, 'companyName')"
            >
              <app-input formControlName="companyName"></app-input>
            </app-form-field>
            <app-form-field
              label="Laboral time"
              [required]="true"
              [control]="getControl(experience, 'period')"
            >
              <app-date-range formControlName="period"></app-date-range>
            </app-form-field>
          </div>
          <div class="experiences__footer">
            <app-button *ngIf="!first" (click)="deleteExperience(i)"
              >Delete</app-button
            >
          </div>
        </div>
      </div>
      <div class="experiences__footer">
        <app-button (click)="addExperience()">Add</app-button>
      </div>
    </form>
  `,
  styles: [
    `
      @import 'src/styles/base/colors';
      @import 'src/styles/base/mixins';

      .experiences {
        &__footer {
          display: flex;
          justify-content: flex-end;
        }
      }

      .experience {
        @include card;
        margin-bottom: 16px;

        &__footer {
          display: flex;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  @Input() public parent!: FormGroup;
  @Input() public name!: string;
  @Input() public values!: ExperienceForm[];

  public form!: FormArray;

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.values = this.values ? this.values : [];

    this.init();
  }

  public getControls(): AbstractControl[] {
    return (this.parent.get(this.name) as FormArray).controls;
  }

  public getControl(control: AbstractControl, name: string): FormControl {
    return control.get('controls')?.get(name) as FormControl;
  }

  public addExperience(): void {
    this.form.push(this.getFormGroup());
  }

  public deleteExperience(position: number): void {
    this.form.removeAt(position);
  }

  private init(): void {
    this.form = this._formBuilder.array(this.getFormGroupArray(this.values));

    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values: ExperienceForm[]): FormGroup[] {
    if (!this.values.length) {
      return [this.getFormGroup()];
    } else {
      return values.map(
        (value: ExperienceForm): FormGroup => this.getFormGroup(value)
      );
    }
  }

  private getFormGroup(value?: ExperienceForm): FormGroup {
    const group: FormGroup = this._formBuilder.group({
      companyName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      period: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });

    if (value) group.patchValue(value);

    return group;
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
