import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { CheckboxesModule } from './checkboxes/checkboxes.module';
import { DateRangeModule } from './date-range/date-range.module';
import { DateModule } from './date/date.module';
import { FormFieldModule } from './form-field/form-field.module';
import { InputModule } from './input/input.module';
import { PasswordModule } from './password/password.module';
import { RadioModule } from './radio/radio.module';
import { SelectModule } from './select/select.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutocompleteModule,
    CheckboxesModule,
    DateModule,
    DateRangeModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    RadioModule,
    SelectModule
  ],
  exports: [
    AutocompleteModule,
    CheckboxesModule,
    DateModule,
    DateRangeModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    RadioModule,
    SelectModule
  ]
})
export class ControlsModule { }
