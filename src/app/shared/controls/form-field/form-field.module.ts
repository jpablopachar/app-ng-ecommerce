import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormFieldComponent } from './components/form-field.component';

@NgModule({
  declarations: [
    FormFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormFieldComponent
  ]
})
export class FormFieldModule { }
