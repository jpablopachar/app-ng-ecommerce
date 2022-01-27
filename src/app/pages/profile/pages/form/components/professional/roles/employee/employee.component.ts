import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem, Icon, Value } from '@app/models/client';
import { ControlEntities, mapControls } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';
import { RecruiterForm } from '../recruiter/recruiter.component';
import { ExperienceForm } from './experience/experience.component';

export interface EmployeeForm {
  specialization: string | null;
  skills: string[];
  qualification: string | null;
  expectedSalary: number;
  experiences: ExperienceForm[] | any[];
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup;
  @Input() name!: string;
  @Input() value!: EmployeeForm | RecruiterForm;
  @Input() dictionaries!: Dictionaries | null;

  public form: FormGroup;
  public controls!: ControlEntities;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      expectedSalary: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      specialization: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      qualification: [
        { value: null, disabled: true },
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      skills: [
        { value: null, disabled: true },
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });

    
  }

  ngOnInit(): void {
    this.controls = {
      specialization: {
        items: this.dictionaries?.specializations.controlItems,
        changed: (): void => {
          this.controls['qualification'].map();
          this.controls['skills'].map();
        },
      },
      qualification: {
        items: this.dictionaries?.qualifications.controlItems,
        map: (): void => {
          if (this.form.value.specialization) {
            this.form.controls['qualification'].enable();
          } else {
            this.form.controls['qualification'].reset();
            this.form.controls['qualification'].disable();
          }
        },
      },
      skills: {
        items: this.dictionaries?.skills.controlItems,
        map: (): void => {
          if (this.form.value.specialization) {
            this.form.controls['skills'].enable();

            const items: {
              label: string;
              value: Value;
              icon?: Icon | undefined;
            }[] = [...(this.dictionaries?.skills.controlItems || [])].map(
              (
                item: ControlItem,
                index: number
              ): {
                label: string;
                value: Value;
                icon?: Icon | undefined;
              } => ({ ...item, label: `${item.label} (${index + 1})` })
            );

            this.controls['skills'].items = items;
          } else {
            this.form.controls['skills'].reset();
            this.form.controls['skills'].disable();
          }
        },
      },
    };

    if (this.value) {
      this.form.patchValue(this.value);
    }

    mapControls(this.controls);

    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
