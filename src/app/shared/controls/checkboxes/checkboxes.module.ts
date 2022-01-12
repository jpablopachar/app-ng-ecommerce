import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxComponent } from './components/checkbox.component';

@NgModule({
  declarations: [
    CheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxesModule { }
