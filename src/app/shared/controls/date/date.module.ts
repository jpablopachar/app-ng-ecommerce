import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateComponent } from './components/date.component';

@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule
  ],
  exports: [
    DateComponent
  ]
})
export class DateModule { }
