import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisplayComponent } from './pages/display.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';

@NgModule({
  declarations: [
    DisplayComponent,
    EmployeeComponent,
    RecruiterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DisplayModule { }
