import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateModule } from '../date/date.module';
import { DateRangeComponent } from './components/date-range.component';

@NgModule({
  declarations: [
    DateRangeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateModule
  ],
  exports: [
    DateRangeComponent
  ]
})
export class DateRangeModule { }
